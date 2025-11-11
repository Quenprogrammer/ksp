import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Basic } from './basic/basic';
import { Password } from './password/password';
import { Logs } from './logs/logs';
import { DeleteAccount } from './delete-account/delete-account';
import { Activities } from './activities/activities';
import { HeaderPoly } from '../../request/header-poly/header-poly';
import {AdminInbox} from './admin-inbox/admin-inbox';

@Component({
  selector: 'app-area-menu',
  imports: [NgIf, Basic, Password, Logs, DeleteAccount, Activities, HeaderPoly, AdminInbox],
  templateUrl: './area-menu.html',
  styleUrls: ['./area-menu.css']
})
export class AreaMenu {
  @Input() header: string = 'School Of Technology';
  @Input() image: string = 'chatIcons/settings/img_7.png';
  @Input() profileImage: string = 'chatIcons/settings/img_7.png';

  @Input() formData: { label: string; value: string; type?: string }[] = [];
  @Input() inboxData: any[] = [];
  @Input() logsData: any[] = [];
  @Input() activitiesData: any[] = [];

  activeStep: string = 'basics';

  showStep(step: string) {
    this.activeStep = step;
  }
}
