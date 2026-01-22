import { Component, Input } from '@angular/core';

@Component({
  selector: 'lh-no-document',
  imports: [],
  templateUrl: './no-document.component.html',
  styleUrl: './no-document.component.scss'
})
export class NoDocumentComponent {
  @Input() message: string = '';
}
