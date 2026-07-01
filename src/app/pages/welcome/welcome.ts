import { signal, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../core/models/roles';
import { Router } from '@angular/router';
import { RoleService } from '../../core/services/role.service';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome implements OnInit {
  constructor(private router: Router) {}

  private roleService = inject(RoleService);
  roles = signal<Role[]>([]);
  ngOnInit(): void {
    this.cargarRoles();
  }

  private cargarRoles(): void {
    console.log('Antes de llamar API');
    this.roleService.getRoles().subscribe({
      next: (response) => {
        console.log('Roles:', response);
        this.roles.set(response);
        console.log('Cantidad cargada:', this.roles.length);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  selectRole(role: Role): void {
    console.log('Rol seleccionado:', role.nombre);
    // luego aquí navegarás con router.navigate()
    this.router.navigate(['/login', role.id]);
  }
}
