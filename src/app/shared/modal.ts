import {Component, EventEmitter, Input, Output, signal} from '@angular/core';


@Component({
  selector: 'app-modal',
  imports: [],
  template: `

    <div  class="modal-overlay "  >


      <div class="modal-content shadow-md" style="overflow: hidden;"  [style.max-width]="width" [style.max-height]="height" [style.background-color]="BackgroundColor" >
        <div class=" d-flex justify-content-end gap-2">
          <h4 class="card-header-title me-auto"  > {{header}}</h4>

          <a class="btn btn-ghost-danger btn-md" (click)="close()">{{buttonText}}</a>

        </div>
        <div class="card-bondy p-1">
          <ng-content>

          </ng-content>
        </div>

      </div>


    </div>

  `,
  styles:`
    .drop-enter {
      border: 0.125rem dashed rgb(166 123 58);
    }.card-bodyOption {
       max-height: 380px;  /* You can adjust the height to your needs */
       overflow-y: auto;  /* Enables vertical scrolling */
     }
    .custom-header {
      padding-top: 5px;  /* Reduce the top padding */
      padding-bottom: 5px; /* Reduce the bottom padding */
    }

    .card-header .row {
      margin-bottom: 0 !important; /* Remove margin between rows */
    }

    .card-header .btn {
      padding: 5px; /* Reduce button padding */
    }

    .card-header img {
      width: 35px; /* Adjust image size if needed */
      height: 35px; /* Adjust image size if needed */
    }
    .custom-header {
      position: sticky;
      top: 0;  /* Stick to the top of the page/container */
      z-index: 1000;  /* Ensure the header stays on top of other content */
      background-color: white;  /* Optional: set a background color to prevent content underneath from showing through */
      /* Optional: adds a subtle shadow for better visibility */
    }

    /* Modal overlay (background behind modal) */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 5000;
    }

    /* Modal content (box that holds the description) */
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 5px;
      width: 100%; /* Adjusted to 80% */
      max-width: 1000px; /* Optional: You can set a max width to ensure it doesn't get too large */
      /* min-height: 90vh;*/ /* Optional: Limit the height to 80% of the viewport */
      height: 90vh; /* Optional: Limit the height to 80% of the viewport */
      overflow-y: auto; /* Make the content scrollable vertically */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    }

    /* Close button for the modal */
    .close {
      position: absolute;
      top: -25px;
      right: 10px;
      font-size: 55px;
      cursor: pointer;
      color: red;
      margin-top: 15px;
    }

    /* Optional: You can add some styles for the buttons */
    button {
      cursor: pointer;
    }
    .modal-head{
      font-weight: bold;
      text-align: center;
      font-size: 30px;
      margin-top: 15px;
    }
    .imgModal{
      max-width:600px;
    }


    .fileCard{
      max-width:500px;
    }


    .upload-container {
      text-align: center;
      margin: 20px;
    }



    .progress {
      width: 100%;
      height: 10px;
      margin-top: -10px ;
    }



    .fileUpload{
      min-width:450px;
      max-width:650px;
    }
  `
})
export class Modal {
  adminSiteModalOpen = signal(true);
  @Input() width: any = '500px';
  @Input() BackgroundColor: any = '';
  @Input() height: any = '500px';
  @Input() header: any = '';
  @Input() buttonText: any = 'Close';
  @Output() closeModal = new EventEmitter<void>(); // <-- emit close to parent

  close() {
    this.closeModal.emit();
  }


}
