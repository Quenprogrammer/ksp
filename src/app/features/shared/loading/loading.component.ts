import { Component, Input } from '@angular/core';

@Component({
  selector: 'lh-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() message: string = '';
}
