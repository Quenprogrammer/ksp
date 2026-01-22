import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="payment-platform-container">
      <!-- Header -->
      <div class="platform-header">
        <div class="header-content">
          <h1><i class="fas fa-wallet"></i> Payment Options</h1>
          <p>Choose how you'd like to pay for your purchase</p>
          <div class="total-amount">
            <span class="amount-label">Total Amount:</span>
            <span class="amount">$299.99</span>
          </div>
        </div>
      </div>

      <!-- Payment Platforms -->
      <div class="platform-section">
        <h2><i class="fas fa-credit-card"></i> Select Payment Platform</h2>
        <p class="section-subtitle">Choose where to send your payment</p>

        <div class="platform-grid">
          <!-- Bank Transfer Options -->
          <div *ngFor="let bank of banks$ | async" class="platform-card bank-platform">
            <div class="platform-card-header">
              <div class="platform-icon bank-icon">
                <i class="fas fa-university"></i>
              </div>
              <div class="platform-info">
                <h3>{{ bank.bankName }}</h3>
                <span class="platform-badge">Bank Transfer</span>
              </div>
              <div class="platform-status">
                <span class="status active">Active</span>
              </div>
            </div>

            <div class="platform-details">
              <div class="detail-item">
                <i class="fas fa-user-circle"></i>
                <div class="detail-content">
                  <span class="detail-label">Account Name</span>
                  <span class="detail-value">{{ bank.accountName }}</span>
                </div>
              </div>

              <div class="detail-item">
                <i class="fas fa-hashtag"></i>
                <div class="detail-content">
                  <span class="detail-label">Account Number</span>
                  <span class="detail-value">{{ bank.accountNumber }}</span>
                </div>
              </div>

              <div class="detail-item">
                <i class="fas fa-code-branch"></i>
                <div class="detail-content">
                  <span class="detail-label">Routing Number</span>
                  <span class="detail-value">{{ bank.routingNumber }}</span>
                </div>
              </div>

              <div class="detail-item" *ngIf="bank.swiftCode">
                <i class="fas fa-globe"></i>
                <div class="detail-content">
                  <span class="detail-label">SWIFT Code</span>
                  <span class="detail-value">{{ bank.swiftCode }}</span>
                </div>
              </div>
            </div>

            <div class="platform-actions">
              <button class="btn-select" (click)="selectPaymentMethod('bank', bank)">
                <i class="fas fa-check-circle"></i> Pay via {{ bank.bankName }}
              </button>
              <button class="btn-copy" (click)="copyAccountDetails(bank)">
                <i class="fas fa-copy"></i> Copy Details
              </button>
            </div>
          </div>

          <!-- Digital Payment Platforms -->
          <div *ngFor="let platform of digitalPlatforms$ | async" class="platform-card digital-platform">
            <div class="platform-card-header">
              <div class="platform-icon digital-icon" [ngClass]="platform.type">
                <i [ngClass]="getPlatformIcon(platform.type)"></i>
              </div>
              <div class="platform-info">
                <h3>{{ platform.platformName }}</h3>
                <span class="platform-badge">{{ platform.type | titlecase }}</span>
              </div>
              <div class="platform-status">
                <span class="status active">Verified</span>
              </div>
            </div>

            <div class="platform-details">
              <div class="detail-item">
                <i class="fas fa-at"></i>
                <div class="detail-content">
                  <span class="detail-label">{{ getPlatformLabel(platform.type) }}</span>
                  <span class="detail-value">{{ platform.username }}</span>
                </div>
              </div>

              <div class="detail-item">
                <i class="fas fa-user"></i>
                <div class="detail-content">
                  <span class="detail-label">Account Holder</span>
                  <span class="detail-value">{{ platform.accountName }}</span>
                </div>
              </div>

              <div class="detail-item" *ngIf="platform.qrCode">
                <i class="fas fa-qrcode"></i>
                <div class="detail-content">
                  <span class="detail-label">QR Code</span>
                  <div class="qr-preview">
                    <img [src]="platform.qrCode" alt="QR Code" class="qr-image">
                    <button class="btn-qr" (click)="showQRCode(platform)">
                      <i class="fas fa-expand"></i> View Full
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="platform-actions">
              <button class="btn-select" (click)="selectPaymentMethod('digital', platform)">
                <i class="fas fa-paper-plane"></i> Send via {{ platform.platformName }}
              </button>
              <button class="btn-copy" (click)="copyDigitalDetails(platform)">
                <i class="fas fa-copy"></i> Copy ID
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Instructions -->
      <div class="instructions-section">
        <h2><i class="fas fa-info-circle"></i> How to Pay</h2>
        <div class="instructions-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Select a Payment Method</h4>
              <p>Choose your preferred payment platform from the options above</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Send Payment</h4>
              <p>Transfer the exact amount to the provided account details</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Upload Proof</h4>
              <p>Take a screenshot or photo of your payment confirmation</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Submit Proof</h4>
              <p>Upload the payment proof using the form below</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Proof Upload -->
      <div class="proof-section" *ngIf="selectedMethod">
        <h2><i class="fas fa-file-upload"></i> Upload Payment Proof</h2>
        <p class="section-subtitle">You selected: <strong>{{ selectedMethod.name }}</strong></p>

        <div class="proof-form">
          <div class="form-group">
            <label for="transactionId">
              <i class="fas fa-receipt"></i> Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              [(ngModel)]="transactionId"
              placeholder="Enter transaction/reference number"
            />
          </div>

          <div class="form-group">
            <label for="amountSent">
              <i class="fas fa-money-bill-wave"></i> Amount Sent
            </label>
            <input
              type="number"
              id="amountSent"
              [(ngModel)]="amountSent"
              placeholder="Enter exact amount sent"
            />
          </div>

          <div class="form-group">
            <label for="paymentProof">
              <i class="fas fa-image"></i> Payment Proof (Screenshot/Photo)
            </label>
            <div class="file-upload">
              <input
                type="file"
                id="paymentProof"
                (change)="onFileSelected($event)"
                accept="image/*,.pdf"
              />
              <label for="paymentProof" class="upload-btn">
                <i class="fas fa-cloud-upload-alt"></i> Choose File
              </label>
              <span class="file-name">{{ selectedFileName || 'No file chosen' }}</span>
            </div>
          </div>

          <button class="btn-submit-proof" (click)="submitPaymentProof()">
            <i class="fas fa-check"></i> Submit Payment Proof
          </button>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <div class="action-card">
          <i class="fas fa-question-circle"></i>
          <h3>Need Help?</h3>
          <p>Contact support for payment assistance</p>
          <button class="btn-help">
            <i class="fas fa-headset"></i> Contact Support
          </button>
        </div>

        <div class="action-card">
          <i class="fas fa-history"></i>
          <h3>Payment History</h3>
          <p>View your previous transactions</p>
          <button class="btn-history">
            <i class="fas fa-clock"></i> View History
          </button>
        </div>

        <div class="action-card">
          <i class="fas fa-shield-alt"></i>
          <h3>Secure Payment</h3>
          <p>Your payment is protected</p>
          <div class="security-badges">
            <span class="badge"><i class="fas fa-lock"></i> SSL</span>
            <span class="badge"><i class="fas fa-shield-alt"></i> Verified</span>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Code Modal -->
    <div class="modal-overlay" *ngIf="showQRModal">
      <div class="modal qr-modal">
        <div class="modal-header">
          <h3>{{ selectedQRPlatform?.platformName }} QR Code</h3>
          <button class="btn-close" (click)="closeQRModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <img [src]="selectedQRPlatform?.qrCode" alt="QR Code" class="qr-full">
          <p class="qr-instruction">Scan this QR code with your payment app</p>
          <div class="qr-details">
            <p><strong>Account:</strong> {{ selectedQRPlatform?.username }}</p>
            <p><strong>Name:</strong> {{ selectedQRPlatform?.accountName }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-download" (click)="downloadQRCode()">
            <i class="fas fa-download"></i> Download QR Code
          </button>
          <button class="btn-copy-qr" (click)="copyQRCodeLink()">
            <i class="fas fa-copy"></i> Copy Link
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div class="modal-overlay" *ngIf="showSuccessModal">
      <div class="modal success-modal">
        <div class="modal-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>Payment Details Copied!</h2>
        <p>Account details have been copied to your clipboard</p>
        <button class="btn-ok" (click)="closeSuccessModal()">
          OK
        </button>
      </div>
    </div>
  `,
  styles: [`
    .payment-platform-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .platform-header {
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      text-align: center;
    }

    .header-content h1 {
      color: #333;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .header-content p {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .total-amount {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem 2rem;
      border-radius: 12px;
      color: white;
      font-weight: 600;
    }

    .amount-label {
      opacity: 0.9;
    }

    .amount {
      font-size: 1.8rem;
      font-weight: 700;
    }

    .platform-section {
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .platform-section h2 {
      color: #333;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .section-subtitle {
      color: #666;
      margin-bottom: 2rem;
    }

    .platform-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .platform-card {
      border-radius: 15px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      border: 2px solid #e1e5eb;
    }

    .platform-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.1);
      border-color: #667eea;
    }

    .platform-card.bank-platform {
      border-left: 4px solid #667eea;
    }

    .platform-card.digital-platform {
      border-left: 4px solid #10ac84;
    }

    .platform-card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .platform-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.8rem;
    }

    .bank-icon {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .digital-icon.paypal {
      background: linear-gradient(135deg, #003087 0%, #009cde 100%);
    }

    .digital-icon.cashapp {
      background: linear-gradient(135deg, #00D632 0%, #00C853 100%);
    }

    .digital-icon.venmo {
      background: linear-gradient(135deg, #3D95CE 0%, #008CFF 100%);
    }

    .digital-icon.zelle {
      background: linear-gradient(135deg, #6D1ED4 0%, #8B46FF 100%);
    }

    .platform-info {
      flex: 1;
    }

    .platform-info h3 {
      margin: 0;
      color: #333;
      font-size: 1.3rem;
    }

    .platform-badge {
      background: #667eea;
      color: white;
      padding: 0.3rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      display: inline-block;
      margin-top: 0.3rem;
    }

    .platform-status .status {
      background: #10ac84;
      color: white;
      padding: 0.3rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    .platform-details {
      background: #f8f9ff;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .detail-item:last-child {
      margin-bottom: 0;
    }

    .detail-item i {
      color: #667eea;
      font-size: 1.2rem;
      width: 24px;
    }

    .detail-content {
      flex: 1;
    }

    .detail-label {
      display: block;
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.2rem;
    }

    .detail-value {
      display: block;
      color: #333;
      font-weight: 600;
      font-size: 1.1rem;
      font-family: 'Courier New', monospace;
    }

    .qr-preview {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .qr-image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      border: 2px solid #e1e5eb;
    }

    .btn-qr {
      background: none;
      border: 2px solid #667eea;
      color: #667eea;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .btn-qr:hover {
      background: #667eea;
      color: white;
    }

    .platform-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-select {
      flex: 1;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .btn-select:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .btn-copy {
      background: #f8f9ff;
      color: #667eea;
      border: 2px solid #667eea;
      padding: 1rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .btn-copy:hover {
      background: #667eea;
      color: white;
    }

    .instructions-section {
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .instructions-steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .step {
      text-align: center;
      padding: 1.5rem;
      border-radius: 12px;
      background: #f8f9ff;
      transition: all 0.3s ease;
    }

    .step:hover {
      background: #667eea;
      color: white;
    }

    .step:hover h4,
    .step:hover p {
      color: white;
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: #667eea;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin: 0 auto 1rem;
    }

    .step-content h4 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    .step-content p {
      color: #666;
      font-size: 0.9rem;
      margin: 0;
    }

    .proof-section {
      background: white;
      border-radius: 20px;
      padding: 2.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .proof-form {
      max-width: 600px;
      margin-top: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 600;
    }

    input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e1e5eb;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .file-upload {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .file-upload input[type="file"] {
      display: none;
    }

    .upload-btn {
      background: #667eea;
      color: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .upload-btn:hover {
      background: #764ba2;
    }

    .file-name {
      color: #666;
      font-style: italic;
    }

    .btn-submit-proof {
      background: linear-gradient(135deg, #10ac84 0%, #1dd1a1 100%);
      color: white;
      border: none;
      padding: 1.2rem 2.5rem;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .btn-submit-proof:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(16, 172, 132, 0.3);
    }

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .action-card {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
    }

    .action-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    }

    .action-card i {
      font-size: 3rem;
      color: #667eea;
      margin-bottom: 1rem;
    }

    .action-card h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    .action-card p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .btn-help, .btn-history {
      background: #667eea;
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 12px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .security-badges {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .badge {
      background: #10ac84;
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      animation: modalSlide 0.3s ease;
    }

    @keyframes modalSlide {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .qr-modal {
      max-width: 400px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #666;
      cursor: pointer;
    }

    .qr-full {
      width: 250px;
      height: 250px;
      display: block;
      margin: 0 auto 1.5rem;
      border: 2px solid #e1e5eb;
      border-radius: 12px;
      padding: 1rem;
    }

    .qr-instruction {
      text-align: center;
      color: #666;
      margin-bottom: 1rem;
    }

    .qr-details {
      background: #f8f9ff;
      padding: 1rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
    }

    .modal-footer {
      display: flex;
      gap: 1rem;
    }

    .btn-download, .btn-copy-qr {
      flex: 1;
      padding: 1rem;
      border-radius: 12px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-download {
      background: #667eea;
      color: white;
    }

    .btn-copy-qr {
      background: #f8f9ff;
      color: #667eea;
      border: 2px solid #667eea;
    }

    .success-modal {
      text-align: center;
    }

    .modal-icon {
      font-size: 4rem;
      color: #10ac84;
      margin-bottom: 1.5rem;
    }

    .btn-ok {
      background: #667eea;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 1.5rem;
    }

    @media (max-width: 768px) {
      .payment-platform-container {
        padding: 1rem;
      }

      .platform-grid {
        grid-template-columns: 1fr;
      }

      .platform-actions {
        flex-direction: column;
      }

      .file-upload {
        flex-direction: column;
        align-items: stretch;
      }

      .upload-btn {
        justify-content: center;
      }

      .modal-footer {
        flex-direction: column;
      }
    }
  `]
})
export class PaymentMethodComponent {
  private firestore = inject(Firestore);

  banks$: Observable<any[]>;
  digitalPlatforms$: Observable<any[]>;

  selectedMethod: any = null;
  transactionId: string = '';
  amountSent: number = 0;
  selectedFileName: string = '';
  selectedFile: File | null = null;

  showQRModal = false;
  selectedQRPlatform: any = null;

  showSuccessModal = false;
  copiedText: string = '';

  constructor() {
    const banksCollection = collection(this.firestore, 'banks');
    const digitalCollection = collection(this.firestore, 'digitalPlatforms');

    this.banks$ = collectionData(banksCollection, { idField: 'id' });
    this.digitalPlatforms$ = collectionData(digitalCollection, { idField: 'id' });
  }

  getPlatformIcon(type: string): string {
    switch(type.toLowerCase()) {
      case 'paypal': return 'fab fa-paypal';
      case 'cashapp': return 'fas fa-dollar-sign';
      case 'venmo': return 'fab fa-vimeo';
      case 'zelle': return 'fas fa-bolt';
      default: return 'fas fa-wallet';
    }
  }

  getPlatformLabel(type: string): string {
    switch(type.toLowerCase()) {
      case 'paypal': return 'PayPal Email';
      case 'cashapp': return 'CashApp $Tag';
      case 'venmo': return 'Venmo Username';
      case 'zelle': return 'Zelle Email/Phone';
      default: return 'Username';
    }
  }

  selectPaymentMethod(type: string, method: any) {
    this.selectedMethod = {
      type: type,
      ...method,
      name: method.bankName || method.platformName
    };
    // Scroll to proof section
    setTimeout(() => {
      const element = document.querySelector('.proof-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  async copyAccountDetails(bank: any) {
    const text = `
Account Name: ${bank.accountName}
Account Number: ${bank.accountNumber}
Routing Number: ${bank.routingNumber}
${bank.swiftCode ? `SWIFT Code: ${bank.swiftCode}` : ''}
    `.trim();

    await navigator.clipboard.writeText(text);
    this.copiedText = 'Bank details';
    this.showSuccessModal = true;
  }

  async copyDigitalDetails(platform: any) {
    const text = `
${platform.platformName}
${this.getPlatformLabel(platform.type)}: ${platform.username}
Account Name: ${platform.accountName}
    `.trim();

    await navigator.clipboard.writeText(text);
    this.copiedText = `${platform.platformName} details`;
    this.showSuccessModal = true;
  }

  showQRCode(platform: any) {
    this.selectedQRPlatform = platform;
    this.showQRModal = true;
  }

  closeQRModal() {
    this.showQRModal = false;
    this.selectedQRPlatform = null;
  }

  downloadQRCode() {
    // In a real app, you would implement QR code download
    const link = document.createElement('a');
    link.href = this.selectedQRPlatform.qrCode;
    link.download = `${this.selectedQRPlatform.platformName}_QR.png`;
    link.click();
  }

  async copyQRCodeLink() {
    await navigator.clipboard.writeText(this.selectedQRPlatform.qrCode);
    this.copiedText = 'QR Code link';
    this.showSuccessModal = true;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  async submitPaymentProof() {
    if (!this.selectedMethod || !this.transactionId || !this.amountSent || !this.selectedFile) {
      alert('Please fill all required fields and upload proof');
      return;
    }

    // In a real app, upload file to storage and save to Firestore
    const paymentProof = {
      methodType: this.selectedMethod.type,
      methodId: this.selectedMethod.id,
      methodName: this.selectedMethod.name,
      transactionId: this.transactionId,
      amountSent: this.amountSent,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Save to Firestore
    const collectionRef = collection(this.firestore, 'paymentProofs');
    // await addDoc(collectionRef, paymentProof);

    alert('Payment proof submitted successfully! We will verify your payment shortly.');
    this.resetForm();
  }

  resetForm() {
    this.selectedMethod = null;
    this.transactionId = '';
    this.amountSent = 0;
    this.selectedFile = null;
    this.selectedFileName = '';
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }
}
