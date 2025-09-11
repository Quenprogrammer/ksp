import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private secretKey = 'my-super-secret-key'; // 🔒 store securely

  // 🔐 Encrypted Set
  setEncrypted<T>(key: string, value: T): void {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
    localStorage.setItem(key, ciphertext);
  }

  // 🔐 Encrypted Get
  getEncrypted<T>(key: string): T | null {
    const ciphertext = localStorage.getItem(key);
    if (!ciphertext) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted) as T;
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }

  // Standard Set
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Standard Get
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  update<T extends object>(key: string, partialData: Partial<T>): void {
    const current = this.get<T>(key) || {} as T;
    const updated = { ...current, ...partialData };
    this.set(key, updated);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
