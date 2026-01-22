import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-system-info',
  standalone: true,
  imports: [],
  templateUrl: './system-info.component.html',
  styleUrl: './system-info.component.css'
})
export class SystemInfoComponent {

  @Input() os: string='';
  @Input() platform: string='';
  @Input() browserVersion: string='';
  @Input() device: string='';
  @Input() browser: string='';
  @Input() screenResolution: string='';
  @Input() memory: string='';
  @Input() processor: string='';
  @Input() timezone: string='';
  @Input() language: string='';

}
