import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.verifyToken().pipe(
    map(isAuthenticated => {
      return isAuthenticated ? true : router.createUrlTree(['/login']);
    })
  )
};
