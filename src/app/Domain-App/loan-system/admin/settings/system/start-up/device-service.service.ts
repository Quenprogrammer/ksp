import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceServiceService {

  os = signal<string>('Unknown');
  platform = signal<string>('Unknown');
  browser = signal<string>('Unknown');
  browserVersion = signal<string>('Unknown');
  device = signal<string>('Unknown');
  screenResolution = signal<string>('Unknown');
  language = signal<string>('Unknown');
  timezone = signal<string>('Unknown');
  processor = signal<string>('Unknown');
  memory = signal<string>('Unknown');

  constructor() {
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

  private getOSName(userAgent: string): string {
    const osMap: { [key: string]: string } = {
      'Windows': 'Windows',
      'Macintosh': 'macOS',
      'Linux': 'Linux',
      'Android': 'Android',
      'iOS': 'iOS'
    };
    return Object.keys(osMap).find(key => userAgent.includes(key)) || 'Unknown';
  }

  private getBrowserName(userAgent: string): string {
    const browserMap: { [key: string]: string } = {
      'Chrome': 'Google Chrome',
      'Firefox': 'Mozilla Firefox',
      'Safari': 'Apple Safari',
      'Edge': 'Microsoft Edge',
      'MSIE': 'Internet Explorer'
    };
    return Object.keys(browserMap).find(key => userAgent.includes(key)) || 'Unknown';
  }

  private getBrowserVersion(userAgent: string): string {
    const regex = /Chrome\/(\d+)|Firefox\/(\d+)|Safari\/(\d+)|Edge\/(\d+)|MSIE (\d+)/;
    const match = userAgent.match(regex);
    if (match) {
      return match[1] || match[2] || match[3] || match[4] || match[5];
    }
    return 'Unknown';
  }

  private getDeviceType(userAgent: string): string {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  }

  private getProcessorInfo(): string {
    const cores = navigator.hardwareConcurrency || 'unknown';
    const uaData = (navigator as any).userAgentData;
    if (uaData && uaData.brands) {
      const brands = uaData.brands.map((b: any) => b.brand).join(', ');
      return `Brands: ${brands}, Logical Cores: ${cores}`;
    }
    const userAgent = navigator.userAgent;
    let cpuHint = 'Unknown';
    switch (true) {
      case userAgent.includes('Intel'): cpuHint = 'Intel-based'; break;
      case userAgent.includes('ARM'): cpuHint = 'ARM-based'; break;
      case userAgent.includes('AMD'): cpuHint = 'AMD-based'; break;
    }
    return `Type: ${cpuHint}, Logical Cores: ${cores}`;
  }

  private getMemoryInfo(): string {
    return 'Unknown'; // can extend later
  }
}
