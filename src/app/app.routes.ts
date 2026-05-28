import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Welcome } from './pages/welcome/welcome';
import { MainLayoutComponent } from './pages/main-layout/main-layout';
export const routes: Routes = [
 
  {
    path: 'login',
    component: Login
  },
  {
    path: 'bienvenido',
    component: Welcome
  },
  
  {
    path: '',
    component: MainLayoutComponent,
    children: [
     /*  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'stories', loadComponent: () => import('./pages/stories/stories.component').then(m => m.StoriesComponent) },
      { path: 'stories/create', loadComponent: () => import('./pages/story-create/story-create.component').then(m => m.StoryCreateComponent) }, */
    ]
  }
];