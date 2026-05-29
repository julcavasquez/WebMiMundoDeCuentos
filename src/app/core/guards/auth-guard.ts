import { inject } from '@angular/core';
import { CanActivateFn,Router  } from '@angular/router';

import { AuthLogin } from '../services/auth-login';
export const authGuard: CanActivateFn = (route, state) => {
   const loginService = inject(AuthLogin);
  const router = inject(Router);

  const isLoggedIn = loginService.isLoggedIn();

  if (!isLoggedIn) {

    router.navigate(['bienvenido']);

    return false;
  }

  return true;
};
