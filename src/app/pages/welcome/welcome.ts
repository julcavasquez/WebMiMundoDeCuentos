import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

interface Role {
  name: string;
  icon: string;
  color: string;
  route: string;
}


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  roles: Role[] = [
    {
      name: 'Administrador',
      icon: '👨‍💼',
      color: '#8b5cf6',
      route: '/login/admin'
    },
    {
      name: 'Docente',
      icon: '👩‍🏫',
      color: '#22c55e',
      route: '/login/teacher'
    },
    {
      name: 'Alumno',
      icon: '👦',
      color: '#facc15',
      route: '/login/student'
    },
    {
      name: 'Padre o Madre',
      icon: '👨‍👩‍👧',
      color: '#ec4899',
      route: '/login/parent'
    }
  ];

  selectRole(role: Role): void {
    console.log('Rol seleccionado:', role.name);

    // luego aquí navegarás con router.navigate()
  }
}
