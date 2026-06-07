import { MenuItem } from '../models/menu-item';

export const MENU_ROL: Record<number, MenuItem[]> = {

  // ADMINISTRADOR

  1: [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },

    {
      label: 'Usuarios',
      icon: 'group',
      route: '/admin/usuarios'
    },

    {
      label: 'Roles',
      icon: 'security',
      route: '/roles'
    },

    {
      label: 'Configuración',
      icon: 'settings',
      route: '/configuracion'
    }

  ],

  // DOCENTE

  2: [

    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },

    {
      label: 'Mis Estudiantes',
      icon: 'school',
      route: '/estudiantes'
    },

    {
      label: 'Cuentos',
      icon: 'menu_book',
      route: '/cuentos'
    }

  ],

  // ALUMNO

  3: [

    {
      label: 'Inicio',
      icon: 'home',
      route: '/dashboard'
    },

    {
      label: 'Mis Cuentos',
      icon: 'auto_stories',
      route: '/mis-cuentos'
    },

    {
      label: 'Juegos',
      icon: 'sports_esports',
      route: '/juegos'
    }

  ],

  // PADRE

  4: [

    {
      label: 'Inicio',
      icon: 'home',
      route: '/dashboard'
    },

    {
      label: 'Progreso',
      icon: 'analytics',
      route: '/progreso'
    }

  ]

};