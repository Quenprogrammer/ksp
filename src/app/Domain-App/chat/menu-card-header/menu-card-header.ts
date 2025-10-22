import {Component, signal} from '@angular/core';
import {Network} from '../component/network/network';
import {NetworkStatsComponent} from '../../core/network-stats.component';
import {NgIf} from '@angular/common';
import {SystemInfoComponent} from './system-info/system-info.component';
import {ApprovalPage} from '../../loan-system/users/approval-page/approval-page';
import {Modal} from '../../../shared/modal';

@Component({
  selector: 'app-menu-card-header',
  imports: [
    Network,
    NetworkStatsComponent,
    NgIf,
    SystemInfoComponent,
    ApprovalPage,
    Modal
  ],
  templateUrl: './menu-card-header.html',
  styleUrl: './menu-card-header.css'
})
export class MenuCardHeader {

  width2='900px'

  height2='800px'
  settings = signal(false);

  cloeOthersModal() {
  this.settings.set(false);
}
  nav = signal(false);
  navOpenButton = signal(false);
  navCloseButton = signal(false);
  openNav(){
    this.nav.set(true)

    this.navCloseButton.set(true)
    this.navOpenButton.set(false)
  }
  closeNav(){
    this.nav.set(false)

    this.navOpenButton.set(true)
    this.navCloseButton.set(false)
  }


  intervalId: ReturnType<typeof setInterval> | null = null;

  os= signal<string>('')
  platform= signal<string>('')
  browser= signal<string>('')
  browserVersion= signal<string>('')
  device= signal<string>('')
  screenResolution= signal<string>('')
  language= signal<string>('')
  timezone= signal<string>('')
  processor= signal<string>('')
  memory= signal<string>('')
  moduleModalOpen = signal<boolean>(false);
  socialModal = signal<boolean>(false);
  invitationModal = signal<boolean>(false);


  path:string='homeScreen/'
  statMenu=[
    { name: 'Contact Us', icon: this.path +'contactus.svg', link: '/contactUs' },
    { name: 'FAQ', icon: this.path+'faq.svg', link: '/FAQ' },
    { name: 'Terms', icon: this.path+'terms.svg', link: '/terms' },
    { name: 'Subscription', icon: this.path+'subscription.svg', link: '/subscription' },
    { name: 'About', icon: this.path+'subscription.svg', link: '/subscription' },
    { name: 'technology', icon: this.path+'storage1.svg', link: '/technology' },
    { name: 'Industries', icon: this.path+'invoice1.svg', link: '/industry' },

  ]

  progress = signal<number>(0);
  increaseProgress() {
    const current = this.progress();
    // Generate a random number between 1 and 10 for the increment
    const randomIncrement = Math.floor(Math.random() * 30) + 1;

    // Check if adding the random increment would exceed 100
    if (current + randomIncrement <= 100) {
      this.progress.set(current + randomIncrement); // increment by random value
    } else {
      this.progress.set(100); // set progress to 100 if it would exceed
    }
  }



  ngAfterViewInit() {
    this.intervalId = setInterval(() => {
      if (this.progress() < 100) {
        this.increaseProgress();
      }
    }, 2000);
  }




  ngOnInit(): void {
    this.initializeSystemInfo();
  }

  private initializeSystemInfo(): void {
    const userAgent = navigator.userAgent;
    this.os.set(this.getOSName(userAgent));
    this.platform.set(navigator.platform);
    this.browser.set(this.getBrowserName(userAgent));
    this.browserVersion.set(this.getBrowserVersion(userAgent));
    this.device.set(this.getDeviceType(userAgent));
    this.screenResolution.set(`${window.screen.width}x${window.screen.height}`);
    this.language.set(navigator.language);
    this.timezone.set(Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.processor.set(this.getProcessorInfo());
    this.memory.set(this.getMemoryInfo());
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getOSName(userAgent: string): string {
    const osMap: { [key: string]: string } = {
      'Windows': 'Windows',
      'Macintosh': 'macOS',
      'Linux': 'Linux',
      'Android': 'Android',
      'iOS': 'iOS'
    };

    return Object.keys(osMap).find(key => userAgent.includes(key)) || 'Unknown';
  }

  getBrowserName(userAgent: string): string {
    const browserMap: { [key: string]: string } = {
      'Chrome': 'Google Chrome',
      'Firefox': 'Mozilla Firefox',
      'Safari': 'Apple Safari',
      'Edge': 'Microsoft Edge',
      'MSIE': 'Internet Explorer'
    };

    return Object.keys(browserMap).find(key => userAgent.includes(key)) || 'Unknown';
  }

  getBrowserVersion(userAgent: string): string {
    const regex = /Chrome\/(\d+)|Firefox\/(\d+)|Safari\/(\d+)|Edge\/(\d+)|MSIE (\d+)/;
    const match = userAgent.match(regex);
    if (match) {
      return match[1] || match[2] || match[3] || match[4] || match[5];
    } else {
      return 'Unknown';
    }
  }

  getDeviceType(userAgent: string): string {
    if (userAgent.includes('Mobile')) {
      return 'Mobile';
    } else if (userAgent.includes('Tablet')) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }
  getProcessorInfo(): string {
    const cores = navigator.hardwareConcurrency || 'unknown';
    const uaData = (navigator as any).userAgentData;

    if (uaData && uaData.brands) {
      const brands = uaData.brands.map((b: any) => b.brand).join(', ');
      return `Brands: ${brands}, Logical Cores: ${cores}`;
    }

    const userAgent = navigator.userAgent;
    let cpuHint = 'Unknown';

    switch (true) {
      case userAgent.includes('Intel'):
        cpuHint = 'Intel-based';
        break;
      case userAgent.includes('ARM'):
        cpuHint = 'ARM-based';
        break;
      case userAgent.includes('AMD'):
        cpuHint = 'AMD-based';
        break;
    }

    return `Type: ${cpuHint}, Logical Cores: ${cores}`;
  }
  getMemoryInfo(): string {
    // Note: This is a very basic implementation and may not work for all systems.
    // For a more accurate implementation, you may need to use a library or API that provides memory information.
    return 'Unknown';
  }
  openModal() {
    this.moduleModalOpen.set(true);
  }

  closeModal() {
    this.moduleModalOpen.set(false);
  }

  openSocialModal() {
    this.socialModal.set(true);
  }

  closeSocialModal() {
    this.socialModal.set(false);
  }

  openInvitationModal() {
    this.invitationModal.set(true);
  }

  closeInvitationModal() {
    this.invitationModal.set(false);
  }

}
