import { CanActivateFn } from '@angular/router';
import {LockdownService} from '../lockdown.service';
import {inject} from '@angular/core';
import {map} from 'rxjs';

export const lockdownGuardGuard: CanActivateFn = (route, state) => {
  const lockdownService = inject(LockdownService);
  return lockdownService.isLocked().pipe(map(locked => !locked));
};
