import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/auth/auth.selectors';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store
    .select(selectAuthUser)
    .pipe(map(user => {
      if (user?.role === 'USER') {
        return router.createUrlTree(['/home']);
      } else {
        return true;
      }
    }));
};
