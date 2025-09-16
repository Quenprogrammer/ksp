import {AfterViewInit, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {StatsLoadingComponent} from './stats-loading/stats-loading.component';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {SystemInfoComponent} from './system-info/system-info.component';
 import {Firestore, } from '@angular/fire/firestore';
import {RecordTrackerService} from './record-tracker.service';
import {DataServiceService} from './dataService';
import {GetCollectionCountService} from './get-collection-count.service';
import {FormsModule} from '@angular/forms';


import {SettingsMenuComponent} from './settings-menu/settings-menu.component';
import {SettingsStatsComponent} from './settings-stats/settings-stats.component';
import {TruncateTextPipe} from '../../../../../../pipes/truncate-text.pipe';

@Component({
  selector: 'app-start-up',
  standalone: true,
  imports: [
    StatsLoadingComponent,
    RouterLink,
    NgIf,

    FormsModule,

    SettingsMenuComponent,
    SettingsStatsComponent,
    TruncateTextPipe,
  ],
  templateUrl: './start-up.component.html',
  styleUrls: ['./start-up.component.css']
})
export class StartUpComponent implements AfterViewInit, OnInit, OnDestroy {
  intervalId: ReturnType<typeof setInterval> | null = null;
  data = signal(false);
  loadingStats = signal(false);
loadedStats = signal(false);

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

  invitationModal = signal<boolean>(false);


  path:string='homeScreen/'


  progress = signal<number>(0);

  increaseProgress() {
    this.loadingStats = signal(true);
    const current = this.progress();
    // Generate a random number between 1 and 10 for the increment
    const randomIncrement = Math.floor(Math.random() * 30) + 1;

    // Check if adding the random increment would exceed 100
    if (current + randomIncrement <= 100) {
      this.progress.set(current + randomIncrement); // increment by random value
    } else {
      this.progress.set(100); // set progress to 100 if it would exceed
      this.loadingStats = signal(false);
      this.loadedStats = signal(true);
      console.log('updating')
    }


  }



  ngAfterViewInit() {
    this.loadingStats = signal(true);
    this.loadedStats = signal(false);
    this.intervalId = setInterval(() => {
      if (this.progress() < 100) {
        this.increaseProgress();
      }
    }, 2000);

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


  openInvitationModal() {
    this.invitationModal.set(true);
  }








  isLoading = signal<boolean>(false);
  constructor(private firestore: Firestore, private firestoreService: DataServiceService,private getDocs: GetCollectionCountService) {

  }

  ngOnInit(): void {
    this.initializeSystemInfo();
    this.trackerUpdate();

  }


  private tracker=inject (RecordTrackerService);
  async trackerUpdate() {
    await this.tracker.incrementValueField('config', 'documentRead');
  }


  dataExport=[
    {name:'Text', operation:''},
    {name:'JSON', operation:''},
    {name:'Excel', operation:''},

  ]

  backupStat=[
    {name:'Database'},
    {name:'Subscription'},
    {name:'Storage'},
  ]


}
