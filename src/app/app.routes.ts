import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Welcome } from './pages/welcome/welcome';
import { RegUsuarios } from './pages/usuarios/reg-usuarios/reg-usuarios';
import { MainLayoutComponent } from './pages/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
import { invitadoGuard } from './core/guards/invitado-guard';
import { rolGuard } from './core/guards/rol-guard';
export const routes: Routes = [
  {
    path: '',
    component: Welcome,
    canActivate: [invitadoGuard],
  },

  {
    path: 'bienvenido',
    component: Welcome,
    canActivate: [invitadoGuard],
  },
  {
    path: 'login/:roleId',
    canActivate: [invitadoGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'nvousuario',
    loadComponent: () =>
      import('./pages/usuarios/reg-usuarios/reg-usuarios').then((m) => m.RegUsuarios),
  },

  {
    path: 'panel',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'usuarios',
        canActivate: [rolGuard],
        data: {
          roles: [1],
        },
        loadComponent: () =>
          import('./pages/usuarios/list-usuarios/list-usuarios').then((m) => m.ListUsuarios),
      },
      {
        path: 'usuarios/nvousuarios',
        canActivate: [rolGuard],
        data: {
          roles: [1],
        },
        loadComponent: () =>
          import('./pages/usuarios/reg-usuarios/reg-usuarios').then((m) => m.RegUsuarios),
      },
      {
        path: 'cuentos/nvocuento',
        canActivate: [rolGuard],
        data: {
          roles: [2],
        },
        loadComponent: () =>
          import('./pages/cuentos/crear-cuento/crear-cuento').then((m) => m.CrearCuento),
      },
      {
        path: 'secciones/list-secciones',
        canActivate: [rolGuard],
        data: {
          roles: [1],
        },
        loadComponent: () =>
          import('./pages/secciones/list-secciones/list-secciones').then((m) => m.ListSecciones),
      },
      {
        path: 'secciones/gestionar-seccion/:id_seccion',
        canActivate: [rolGuard],
        data: {
          roles: [1],
        },
        loadComponent: () =>
          import('./pages/secciones/gestionar-seccion/gestionar-seccion').then(
            (m) => m.GestionarSeccion,
          ),
      },
      {
        path: 'anios/list_anios',
        canActivate: [rolGuard],
        data: {
          roles: [1],
        },
        loadComponent: () =>
          import('./pages/anio_lectivos/list-anios/list-anios').then((m) => m.ListAnios),
      },
      {
        path: 'anios/reg_anio_lectivo',
        canActivate: [rolGuard],
        data: {
          roles: [1],
        },
        loadComponent: () =>
          import('./pages/anio_lectivos/reg-anio-lectivo/reg-anio-lectivo').then(
            (m) => m.RegAnioLectivo,
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
      /*  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'stories', loadComponent: () => import('./pages/stories/stories.component').then(m => m.StoriesComponent) },
      { path: 'stories/create', loadComponent: () => import('./pages/story-create/story-create.component').then(m => m.StoryCreateComponent) }, */
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
