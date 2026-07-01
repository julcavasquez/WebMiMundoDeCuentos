import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const rolGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const rolesPermitidos = route.data['roles'] || [];

  if (rolesPermitidos.includes(user.rolId)) {
    return true;
  }

  // Si no tiene permisos, regresar al dashboard
  return router.parseUrl('/panel');
};
