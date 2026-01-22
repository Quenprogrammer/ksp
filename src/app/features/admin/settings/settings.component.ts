import { Component } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';
import { SecurityComponent } from './security/security.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'lh-settings',
  imports: [

    ProfileComponent,
    SecurityComponent,
    PaymentMethodComponent,
    NotificationsComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  activeTab: string = 'profile';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
