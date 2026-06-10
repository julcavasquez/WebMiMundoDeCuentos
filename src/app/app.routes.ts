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
  loadComponent: () =>
    import('./pages/login/login')
      .then(m => m.Login)
  },
   {
    path: 'nvousuario',
    loadComponent: () =>
      import('./pages/usuarios/reg-usuarios/reg-usuarios')
        .then(m => m.RegUsuarios)
  },
  
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
      path: 'usuarios',
      canActivate: [rolGuard],
      data: {
        roles: [1]
      },
      loadComponent: () =>
        import('./pages/usuarios/list-usuarios/list-usuarios')
          .then(m => m.ListUsuarios)
      },
      {
      path: 'usuarios/nvousuarios',
      canActivate: [rolGuard],
      data: {
      roles: [1]
      },
      loadComponent: () =>
        import('./pages/usuarios/reg-usuarios/reg-usuarios')
          .then(m => m.RegUsuarios)
      },
     /*  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'stories', loadComponent: () => import('./pages/stories/stories.component').then(m => m.StoriesComponent) },
      { path: 'stories/create', loadComponent: () => import('./pages/story-create/story-create.component').then(m => m.StoryCreateComponent) }, */
    ]
  }
];