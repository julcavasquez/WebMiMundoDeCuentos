import { MenuItem } from '../models/menu-item';

export const MENU_ROL: Record<number, MenuItem[]> = {
  // ADMINISTRADOR

  1: [
    {
      label: 'Dashboard',
      icon: 'home',
      route: '/dashboard',
    },
    {
      label: 'Años Lectivos',
      icon: 'calendar_month',
      route: '/panel/anios/list_anios',
    },
    {
      label: 'Usuarios',
      icon: 'group',
      route: '/panel/usuarios',
    },
    {
      label: 'Secciones',
      icon: 'dashboard',
      route: '/panel/secciones/list-secciones',
    },

    {
      label: 'Roles',
      icon: 'security',
      route: '/roles',
    },

    {
      label: 'Configuración',
      icon: 'settings',
      route: '/configuracion',
    },
  ],

  // DOCENTE

  2: [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },

    {
      label: 'Mis Cuentos',
      icon: 'auto_stories',
      route: '/cuentos',
    },

    {
      label: 'Crear Cuentos',
      icon: 'add_circle',
      route: '/panel/cuentos/nvocuento',
    },

    {
      label: 'Actividades',
      icon: 'assignment',
      route: '/cuentos',
    },

    {
      label: 'Mis Alumnos',
      icon: 'groups',
      route: '/cuentos',
    },

    {
      label: 'Resultados',
      icon: 'analytics',
      route: '/cuentos',
    },

    {
      label: 'Ranking',
      icon: 'emoji_events',
      route: '/cuentos',
    },
  ],

  // ALUMNO

  3: [
    {
      label: 'Inicio',
      icon: 'home',
      route: '/dashboard',
    },

    {
      label: 'Mis Cuentos',
      icon: 'auto_stories',
      route: '/mis-cuentos',
    },

    {
      label: 'Juegos',
      icon: 'sports_esports',
      route: '/juegos',
    },
  ],

  // PADRE

  4: [
    {
      label: 'Inicio',
      icon: 'home',
      route: '/dashboard',
    },

    {
      label: 'Progreso',
      icon: 'analytics',
      route: '/progreso',
    },
  ],
};
