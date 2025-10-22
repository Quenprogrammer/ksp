import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {Activities} from './activities/activities';
import {DeleteAccount} from './delete-account/delete-account';
import {Logs} from './logs/logs';
import {Password} from './password/password';
import {Basic} from './basic/basic';
import {HeaderPoly} from '../../request/header-poly/header-poly';

@Component({
  selector: 'app-area-menu',
  imports: [
    NgIf,
    Activities,
    DeleteAccount,
    Logs,
    Password,
    Basic,
    HeaderPoly
  ],
  templateUrl: './area-menu.html',
  styleUrl: './area-menu.css'
})
export class AreaMenu {
  @Input() header: string = 'School Of Technology';
  @Input() image: string = 'chatIcons/settings/img_7.png';
  @Input() profileImage: string = 'School Of Technology';

  activeStep = 'basics'; // show first div by default

  showStep(step: string) {
    this.activeStep = step;
  }
}
