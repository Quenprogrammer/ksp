import {Component, Input} from '@angular/core';
import {textColor,backgroundColor} from '../../data/config';

@Component({
  selector: 'app-loading-card',
  imports: [],
  templateUrl: './loading-card.html',
  styleUrl: './loading-card.scss'
})
export class LoadingCard {
  @Input() height:string = '10px';
  @Input() cardHeight:string = '130px';
  @Input() width:string = '50px';
  @Input() Loader:string = 'icons/t10.gif';
  @Input() message:string = '';
  @Input() TextColor:any = textColor;
  @Input() BackgroundColor:any = backgroundColor;


  protected readonly textColor = textColor;
}
