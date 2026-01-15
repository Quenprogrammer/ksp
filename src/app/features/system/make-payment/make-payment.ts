import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

interface City {
  name: string;
  value: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  city: string;
  postcode: string;
  address: string;
  addressLine2?: string;
  sameAddress: boolean;
}

export interface DeliveryInfo {
  postcode: string;
  estimatedDate: string;
  estimatedTime: string;
}

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  value: string;
  icon?: string;
  cards?: string[];
  expanded: boolean;
}

interface Bank {
  id: string;
  name: string;
  code: string;
}

@Component({
  selector: 'app-make-payment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './make-payment.html',
  styleUrl: './make-payment.css'
})
export class MakePayment {
  checkoutForm: FormGroup;
  paymentForm: FormGroup;
  sameBillingAddress = true;
  showAddressLine = false;
  deliveryInfoExpanded = false;

  // Payment methods
  selectedPaymentMethod: string = 'card';
  showPromoCode = false;
  acceptTerms = false;
  today = new Date();

  cities: City[] = [
    { name: 'Select your city', value: '' },
    { name: 'New York City', value: 'New York City' },
    { name: 'Los Angeles', value: 'Los Angeles' },
    { name: 'Chicago', value: 'Chicago' },
    { name: 'Houston', value: 'Houston' },
    { name: 'Phoenix', value: 'Phoenix' },
    { name: 'Philadelphia', value: 'Philadelphia' },
    { name: 'San Antonio', value: 'San Antonio' },
    { name: 'San Diego', value: 'San Diego' },
    { name: 'Dallas', value: 'Dallas' },
    { name: 'San Jose', value: 'San Jose' },
    { name: 'Austin', value: 'Austin' },
    { name: 'Seattle', value: 'Seattle' }
  ];

  // List of banks
  banks: Bank[] = [
    { id: '1', name: 'Bank of America', code: 'BOFA' },
    { id: '2', name: 'Chase Bank', code: 'CHASE' },
    { id: '3', name: 'Wells Fargo', code: 'WF' },
    { id: '4', name: 'Citibank', code: 'CITI' },
    { id: '5', name: 'HSBC', code: 'HSBC' },
    { id: '6', name: 'Capital One', code: 'CAPONE' },
    { id: '7', name: 'TD Bank', code: 'TD' },
    { id: '8', name: 'PNC Bank', code: 'PNC' },
    { id: '9', name: 'US Bank', code: 'USB' },
    { id: '10', name: 'Truist Bank', code: 'TRUIST' }
  ];

  paymentMethods: PaymentMethod[] = [
    {
      id: 'cash',
      name: 'Cash on delivery',
      value: 'cash',
      expanded: false
    },
    {
      id: 'card',
      name: 'Credit or debit card',
      value: 'card',
      expanded: true,
      cards: ['amex', 'visa', 'mastercard', 'maestro']
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      value: 'bank',
      expanded: false
    },
    {
      id: 'paypal',
      name: 'PayPal',
      value: 'paypal',
      icon: 'assets/img/payment-methods/paypal-icon.svg',
      expanded: false
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      value: 'googlepay',
      icon: 'assets/img/payment-methods/google-icon.svg',
      expanded: false
    }
  ];

  orderItems: OrderItem[] = [
    { id: 1, name: 'iPhone', image: 'assets/img/shop/electronics/thumbs/08.png', price: 999, quantity: 1 },
    { id: 2, name: 'iPad Pro', image: 'assets/img/shop/electronics/thumbs/09.png', price: 1099, quantity: 1 },
    { id: 3, name: 'Smart Watch', image: 'assets/img/shop/electronics/thumbs/01.png', price: 329, quantity: 1 }
  ];

  orderSummary = {
    subtotal: 2427.00,
    saving: 110.00,
    tax: 73.40,
    shipping: 16.50,
    estimatedTotal: 2406.90,
    bonuses: 240
  };

  deliveryInfo = {
    postcode: '15006',
    estimatedDate: 'Monday, 13',
    estimatedTime: '12:00 - 16:00'
  };

  constructor(private fb: FormBuilder) {
    // Shipping address form
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: [''],
      city: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      address: ['', [Validators.required]],
      addressLine2: [''],
      sameAddress: [true]
    });

    // Payment form
    this.paymentForm = this.fb.group({
      paymentMethod: ['card', [Validators.required]],

      // Cash payment fields
      cashChange: [''],

      // Credit card fields
      cardNumber: ['', [Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvc: ['', [Validators.pattern(/^\d{3,4}$/)]],

      // Bank transfer fields
      bankName: ['', []],
      accountNumber: ['', [Validators.pattern(/^\d{9,18}$/)]],
      accountName: ['', []],
      paymentDate: ['', []],
      paymentTime: ['', []],
      referenceNumber: ['', []],
      additionalInfo: ['', []],

      // Common fields
      promoCode: [''],
      comments: [''],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    // Initialize form values
    this.checkoutForm.patchValue({
      postcode: this.deliveryInfo.postcode
    });

    // Set current date and time for bank payment
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    this.paymentForm.patchValue({
      paymentDate: currentDate,
      paymentTime: currentTime
    });

    // Subscribe to payment method changes
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      this.selectedPaymentMethod = value;
      this.updatePaymentMethodExpansion(value);
      this.updatePaymentValidators(value);
    });
  }

  toggleDeliveryInfo(): void {
    this.deliveryInfoExpanded = !this.deliveryInfoExpanded;
  }

  toggleAddressLine(): void {
    this.showAddressLine = !this.showAddressLine;
  }

  toggleBillingAddress(): void {
    this.sameBillingAddress = !this.sameBillingAddress;
    this.checkoutForm.get('sameAddress')?.setValue(this.sameBillingAddress);
  }

  togglePromoCode(): void {
    this.showPromoCode = !this.showPromoCode;
  }

  updatePaymentMethodExpansion(selectedMethod: string): void {
    this.paymentMethods.forEach(method => {
      method.expanded = method.value === selectedMethod;
    });
  }

  updatePaymentValidators(paymentMethod: string): void {
    // Reset all validators first
    const cardNumberControl = this.paymentForm.get('cardNumber');
    const expiryDateControl = this.paymentForm.get('expiryDate');
    const cvcControl = this.paymentForm.get('cvc');
    const bankNameControl = this.paymentForm.get('bankName');
    const accountNumberControl = this.paymentForm.get('accountNumber');
    const accountNameControl = this.paymentForm.get('accountName');
    const paymentDateControl = this.paymentForm.get('paymentDate');
    const paymentTimeControl = this.paymentForm.get('paymentTime');

    // Clear validators
    cardNumberControl?.clearValidators();
    expiryDateControl?.clearValidators();
    cvcControl?.clearValidators();
    bankNameControl?.clearValidators();
    accountNumberControl?.clearValidators();
    accountNameControl?.clearValidators();
    paymentDateControl?.clearValidators();
    paymentTimeControl?.clearValidators();

    if (paymentMethod === 'card') {
      cardNumberControl?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      expiryDateControl?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
      cvcControl?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);
    } else if (paymentMethod === 'bank') {
      bankNameControl?.setValidators([Validators.required]);
      accountNumberControl?.setValidators([Validators.required, Validators.pattern(/^\d{9,18}$/)]);
      accountNameControl?.setValidators([Validators.required]);
      paymentDateControl?.setValidators([Validators.required]);
      paymentTimeControl?.setValidators([Validators.required]);
    }

    // Update validation status
    cardNumberControl?.updateValueAndValidity();
    expiryDateControl?.updateValueAndValidity();
    cvcControl?.updateValueAndValidity();
    bankNameControl?.updateValueAndValidity();
    accountNumberControl?.updateValueAndValidity();
    accountNameControl?.updateValueAndValidity();
    paymentDateControl?.updateValueAndValidity();
    paymentTimeControl?.updateValueAndValidity();
  }

  selectPaymentMethod(method: PaymentMethod): void {
    this.selectedPaymentMethod = method.value;
    this.paymentForm.get('paymentMethod')?.setValue(method.value);
    this.updatePaymentMethodExpansion(method.value);
    this.updatePaymentValidators(method.value);
  }

  onShippingSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Shipping form submitted:', this.checkoutForm.value);
      // Navigate to payment section or continue
    } else {
      this.markFormGroupTouched(this.checkoutForm);
    }
  }

  onPaymentSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Payment form submitted:', this.paymentForm.value);
      // Here you would typically send the data to your backend
      alert('Order submitted successfully!');
    } else {
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get shippingFormControls() {
    return this.checkoutForm.controls;
  }

  get paymentFormControls() {
    return this.paymentForm.controls;
  }

  get estimatedTotal(): number {
    return this.orderSummary.subtotal - this.orderSummary.saving + this.orderSummary.tax + this.orderSummary.shipping;
  }

  get paymentAmount(): string {
    return `$${this.estimatedTotal.toFixed(2)}`;
  }

  // Helper methods for card formatting
  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.substring(0, 16);

    // Add spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    event.target.value = value;
    this.paymentForm.get('cardNumber')?.setValue(value.replace(/\s/g, ''));
  }

  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substring(0, 4);

    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }

    event.target.value = value;
    this.paymentForm.get('expiryDate')?.setValue(value);
  }

  formatAccountNumber(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    event.target.value = value;
  }

  generateReferenceNumber(): void {
    const ref = 'REF' + Math.random().toString(36).substring(2, 10).toUpperCase();
    this.paymentForm.get('referenceNumber')?.setValue(ref);
  }

  setPaymentDateTime(): void {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    this.paymentForm.patchValue({
      paymentDate: currentDate,
      paymentTime: currentTime
    });
  }
}
