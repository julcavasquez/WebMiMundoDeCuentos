import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Role } from '../../core/models/roles';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  constructor(
  private router: Router
) {}
  roles: Role[] = [
    {
      name: 'Administrador',
      icon: '/assets/images/roles/admin.jpeg',
      color: '#8b5cf6',
      route: '/login/admin',
      type: 'general'
    },
    {
      name: 'Docente',
      icon: '/assets/images/roles/docentes.jpeg',
      color: '#22c55e',
      route: '/login/docentes',
      type: 'general'
    },
    {
      name: 'Alumno',
      icon: '/assets/images/roles/alumno.jpeg',
      color: '#facc15',
      route: '/login/alumno',
      type: 'alumno'
    },
    {
      name: 'Padre o Madre',
      icon: '/assets/images/roles/padres.jpeg',
      color: '#ec4899',
      route: '/login/padres',
      type: 'general'
    }
  ];

  selectRole(role: Role): void {
    console.log('Rol seleccionado:', role.name);

    // luego aquí navegarás con router.navigate()
      this.router.navigate([role.route]);
  }
}
