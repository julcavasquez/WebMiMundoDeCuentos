import { signal, Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../../core/models/usuario';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-list-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './list-usuarios.html',
  styleUrl: './list-usuarios.scss',
})
export class ListUsuarios implements OnInit {
  private usuarioService = inject(UsuariosService);

  usuarios = signal<Usuario[]>([]);

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  filteredUsers = signal<Usuario[]>([]);

  paginatedUsers = signal<Usuario[]>([]);

  search = '';

  currentPage = 1;

  pageSize = 10;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredUsers().length / this.pageSize));
  }
  filterUsers(): void {
    console.log();
    const text = this.search.toLowerCase();
    console.log(text);
    const filtered = this.usuarios().filter(
      (u) =>
        (u.nombres ?? '').toLowerCase().includes(text) ||
        (u.apellidos ?? '').toLowerCase().includes(text) ||
        (u.correo ?? '').toLowerCase().includes(text),
    );

    this.filteredUsers.set(filtered);

    this.currentPage = 1;

    this.updatePagination();
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers.set(this.filteredUsers().slice(start, end));
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // edit(usuario: Usuario): void {

  //   this.router.navigate([
  //     '/usuarios/editar',
  //     usuario.id
  //   ]);

  // }

  private cargarUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (response) => {
        this.usuarios.set(response);
        this.filteredUsers.set(response);
        this.updatePagination();
        console.log(this.paginatedUsers);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  cambiarEstadoUsu(usuario: Usuario): void {
    const isActive = usuario.estado === 1;
    Swal.fire({
      title: isActive ? '¿Desactivar usuario?' : '¿Activar usuario?',
      text: isActive
        ? 'El usuario dejará de tener acceso al sistema.'
        : 'El usuario podrá volver a ingresar al sistema.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: isActive ? 'Desactivar' : 'Activar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.cambiarEstadoUsuario(usuario.id_usu).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Correcto',
              text: isActive ? 'Usuario desactivado.' : 'Usuario activado.',
              timer: 2000,
              showConfirmButton: false,
            });
            this.cargarUsuarios();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar el estado.',
            });
          },
        });
      }
    });
  }

  eliminarUsuario(usuario: Usuario): void {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'El usuario será eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.id_usu).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',

              title: 'Usuario eliminado',

              text: 'El usuario fue eliminado correctamente.',

              timer: 2000,

              showConfirmButton: false,
            });

            this.cargarUsuarios();
          },

          error: () => {
            Swal.fire({
              icon: 'error',

              title: 'Error',

              text: 'No se pudo eliminar el usuario.',
            });
          },
        });
      }
    });
  }
}
