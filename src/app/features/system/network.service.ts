import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService implements OnDestroy {
  private onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);

  // Define the event listener handlers as properties
  private onlineHandler = () => this.updateOnlineStatus(true);
  private offlineHandler = () => this.updateOnlineStatus(false);

  constructor() {
    // Event listeners for online/offline status changes
    window.addEventListener('online', this.onlineHandler);
    window.addEventListener('offline', this.offlineHandler);
  }

  private updateOnlineStatus(status: boolean): void {
    this.onlineStatus.next(status);
  }

  getOnlineStatus(): Observable<boolean> {
    return this.onlineStatus.asObservable();
  }

  // Cleanup event listeners on destroy to prevent memory leaks
  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineHandler);
    window.removeEventListener('offline', this.offlineHandler);
  }
}
