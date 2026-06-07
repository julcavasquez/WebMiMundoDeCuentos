import {
  CanActivateFn
} from '@angular/router';

export const rolGuard:
CanActivateFn = (route) => {

  const user =
    JSON.parse(
      localStorage.getItem('user') || '{}'
    );

  const roles =
    route.data['roles'];

  return roles.includes(
    user.rolId
  );

};