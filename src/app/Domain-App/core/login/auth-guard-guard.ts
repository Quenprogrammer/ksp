import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthService} from './auth-service';
import {inject} from '@angular/core';

export const authGuardGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Synchronous check via signal (fast path)
  if (auth.isAuthenticated()) return true;

  // If not authenticated, redirect to login
  return router.createUrlTree(['/auth/login']) as UrlTree;
};

