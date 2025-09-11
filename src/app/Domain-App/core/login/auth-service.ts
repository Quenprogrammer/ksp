import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut as fbSignOut,
} from '@angular/fire/auth';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  // Signals for local state management
  readonly user = signal<User | null>(null);
  readonly status = signal<AuthStatus>('idle');
  readonly error = signal<string | null>(null);

  // Derived/computed state
  readonly isAuthenticated = computed(() => this.user() !== null);
  readonly isLoading = computed(() => this.status() === 'loading');

  constructor() {
    // Keep user in sync with Firebase
    onAuthStateChanged(this.auth, (u) => {
      this.user.set(u);
      if (u) {
        this.status.set('authenticated');
      } else if (this.status() !== 'loading') {
        this.status.set('idle');
      }
    });

    // Handle redirect results (mobile or popup-blocked scenarios)
    this.handleRedirectResult();
  }

  private async handleRedirectResult(): Promise<void> {
    try {
      const result = await getRedirectResult(this.auth);
      if (result?.user) {
        this.user.set(result.user);
        this.status.set('authenticated');
        await this.router.navigateByUrl('/admin');
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to complete redirect sign-in';
      this.error.set(message);
      this.status.set('error');
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.error.set(null);
    this.status.set('loading');
    const provider = new GoogleAuthProvider();

    // Prefer popup on desktop, fallback to redirect if blocked
    try {
      const cred = await signInWithPopup(this.auth, provider);
      this.user.set(cred.user);
      this.status.set('authenticated');
      await this.router.navigateByUrl('/cus');
    } catch (popupErr: unknown) {
      // If popup fails (e.g., blocked), try redirect
      try {
        await signInWithRedirect(this.auth, provider);
        // control returns after redirect; status remains 'loading' until handleRedirectResult runs
      } catch (redirectErr: unknown) {
        const message =
          redirectErr instanceof Error ? redirectErr.message :
            popupErr instanceof Error ? popupErr.message :
              'Google sign-in failed';
        this.error.set(message);
        this.status.set('error');
      }
    }
  }

  async signOut(): Promise<void> {
    this.status.set('loading');
    this.error.set(null);
    try {
      await fbSignOut(this.auth);
      this.user.set(null);
      this.status.set('idle');
      await this.router.navigateByUrl('/auth/login');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Sign-out failed';
      this.error.set(message);
      this.status.set('error');
    }
  }
}
