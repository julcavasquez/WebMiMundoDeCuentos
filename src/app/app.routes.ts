import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Welcome } from './pages/welcome/welcome';
import { MainLayoutComponent } from './pages/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
export const routes: Routes = [
 
  {
    path: '',
    component: Welcome
  },
  
  {
    path: 'bienvenido',
    component: Welcome
  },
  {
  path: 'login/:role',
  loadComponent: () =>
    import('./pages/login/login')
      .then(m => m.Login)
},
  
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
     /*  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'stories', loadComponent: () => import('./pages/stories/stories.component').then(m => m.StoriesComponent) },
      { path: 'stories/create', loadComponent: () => import('./pages/story-create/story-create.component').then(m => m.StoryCreateComponent) }, */
    ]
  }
];