import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkSpeedService {

  getNetworkInfo(): {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  } | null {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    if (!connection) {
      return null;
    }

    return {
      effectiveType: connection.effectiveType, // e.g. '4g', '3g', 'slow-2g'
      downlink: connection.downlink,           // Mbps
      rtt: connection.rtt,                     // Round-trip time in ms
      saveData: connection.saveData            // true if Data Saver is on
    };
  }
}
