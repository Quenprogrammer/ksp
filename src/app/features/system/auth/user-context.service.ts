import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  private _vendor = signal<string | null>(null);
  readonly vendor = this._vendor.asReadonly();

  private _affiliate = signal<string | null>(null);
  readonly affiliate = this._affiliate.asReadonly();

  constructor() {
    this._vendor.set('devCollection');
    this._affiliate.set('devAffiliate');
  }

  setVendor(id: string) {
    this._vendor.set(id);
  }

  clearVendor() {
    this._vendor.set(null);
  }

  setAffiliate(affiliate: string) {
    this._affiliate.set(affiliate);
  }

  clearAffiliate() {
    this._affiliate.set(null);
  }
}
