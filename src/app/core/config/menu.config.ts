import { MenuItem } from '../models/menu-item';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: '🏠',
    route: '/dashboard',
    roles: ['admin', 'docente', 'alumno', 'padre']
  },
  {
    label: 'Cuentos',
    icon: '📚',
    route: '/stories',
    roles: ['admin', 'docente']
  },
  {
    label: 'Crear cuento',
    icon: '➕',
    route: '/stories/create',
    roles: ['admin', 'docente']
  },
  {
    label: 'Categorías',
    icon: '🏷️',
    route: '/categories',
    roles: ['admin']
  },
  {
    label: 'Usuarios',
    icon: '👥',
    route: '/users',
    roles: ['admin']
  },
  {
    label: 'Mis cuentos',
    icon: '📖',
    route: '/my-stories',
    roles: ['alumno']
  },
  {
    label: 'Progreso',
    icon: '📊',
    route: '/progress',
    roles: ['docente', 'padre']
  },
  {
    label: 'Configuración',
    icon: '⚙️',
    route: '/settings',
    roles: ['admin']
  }
];