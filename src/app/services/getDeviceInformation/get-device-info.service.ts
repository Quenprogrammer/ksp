import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDeviceInfoService {
  os = signal<string>('Unknown');
  browser = signal<string>('Unknown');
  device = signal<string>('Unknown');
  language = signal<string>('Unknown');
  timezone = signal<string>('Unknown');
  resolution = signal<string>('Unknown');
  colorDepth = signal<number>(0);
  cookiesEnabled = signal<boolean>(false);
  onlineStatus = signal<boolean>(true);
  platform = signal<string>('Unknown');
  touchSupport = signal<boolean>(false);

  constructor() {
    this.initializeSystemInfo();
    this.listenForChanges();
  }

  private initializeSystemInfo(): void {
    const userAgent = navigator.userAgent;
    this.os.set(this.getOSName(userAgent));
    this.browser.set(this.getBrowserName(userAgent));
    this.device.set(this.getDeviceType(userAgent));
    this.language.set(navigator.language);
    this.timezone.set(Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.resolution.set(`${window.screen.width}x${window.screen.height}`);
    this.colorDepth.set(window.screen.colorDepth);
    this.cookiesEnabled.set(navigator.cookieEnabled);
    this.onlineStatus.set(navigator.onLine);
    this.platform.set(navigator.platform);
    this.touchSupport.set(('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
  }

  private listenForChanges(): void {
    window.addEventListener('languagechange', () => {
      this.language.set(navigator.language);
    });

    window.addEventListener('online', () => {
      this.onlineStatus.set(true);
    });

    window.addEventListener('offline', () => {
      this.onlineStatus.set(false);
    });

    window.addEventListener('resize', () => {
      this.resolution.set(`${window.screen.width}x${window.screen.height}`);
    });
  }

  private getOSName(userAgent: string): string {
    const osMap: Record<string, string> = {
      'Windows': 'Windows',
      'Macintosh': 'macOS',
      'Linux': 'Linux',
      'Android': 'Android',
      'iPhone': 'iOS',
      'iPad': 'iOS'
    };
    return Object.keys(osMap).find(key => userAgent.includes(key)) || 'Unknown';
  }

  private getBrowserName(userAgent: string): string {
    const browserMap: Record<string, string> = {
      'Chrome': 'Google Chrome',
      'Firefox': 'Mozilla Firefox',
      'Safari': 'Apple Safari',
      'Edg': 'Microsoft Edge',
      'MSIE': 'Internet Explorer'
    };
    return Object.keys(browserMap).find(key => userAgent.includes(key)) || 'Unknown';
  }

  private getDeviceType(userAgent: string): string {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  }
}
