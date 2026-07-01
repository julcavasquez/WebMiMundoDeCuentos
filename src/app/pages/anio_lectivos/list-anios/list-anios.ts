import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnioLectivoService } from '../../../core/services/aniolectivo.service';
import { AnioLectivo } from '../../../core/models/anio_lectivo';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-anios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './list-anios.html',
  styleUrl: './list-anios.scss',
})
export class ListAnios {
  private aniolectivoService = inject(AnioLectivoService);
  aniosLectivos = signal<AnioLectivo[]>([]);
  filteredAnios = signal<AnioLectivo[]>([]);
  paginateAnios = signal<AnioLectivo[]>([]);
  search = '';

  private fb = inject(FormBuilder);
  form = this.fb.group({
    anio: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    nombre: ['', Validators.required],
    fecha_inicio: ['', Validators.required],
    fecha_fin: ['', Validators.required],
    observaciones: [''],
  });
  ngOnInit(): void {
    this.cargarAniosLectivos();
  }

  activos = 0;
  cerrados = 0;
  registrados = 0;
  total = 0;

  private cargarAniosLectivos(): void {
    this.aniolectivoService.getAllAnios().subscribe({
      next: (response: any) => {
        this.aniosLectivos.set(response.data);
        this.filteredAnios.set(response.data);
        this.updatePagination();
        this.activos = response.resumen[0].activos;
        this.cerrados = response.resumen[0].cerrados;
        this.registrados = response.resumen[0].registrados;
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  filterAnio(): void {
    console.log();
    const text = this.search.toLowerCase();
    console.log(text);
    const filtered = this.aniosLectivos().filter(
      (a) =>
        (a.nombre ?? '').toLowerCase().includes(text) ||
        (String(a.anio) ?? '').toLowerCase().includes(text),
    );

    this.filteredAnios.set(filtered);
    this.currentPage = 1;
    this.updatePagination();
  }

  currentPage = 1;
  pageSize = 5;
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredAnios().length / this.pageSize));
  }
  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginateAnios.set(this.filteredAnios().slice(start, end));
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

  anioSeleccionado: any;

  seleccionarAnio(anio: any): void {
    this.anioSeleccionado = anio;
    const fecha_ini = this.anioSeleccionado.fecha_inicio.substring(0, 10);
    const fecha_fin = this.anioSeleccionado.fecha_fin.substring(0, 10);

    this.form.patchValue({
      anio: this.anioSeleccionado.anio,
      nombre: this.anioSeleccionado.nombre,
      fecha_inicio: fecha_ini,
      fecha_fin: fecha_fin,
      observaciones: this.anioSeleccionado.observaciones || null,
    });
  }

  editarAnio() {
    console.log('Editar');
  }

  cambiarEstado(anio: AnioLectivo) {
    const isActive = anio.estado === 'REGISTRADO';
    Swal.fire({
      title: isActive ? '¿Iniciar Año Lectivo?' : '¿Cerrar Año Lectivo?',
      text: isActive
        ? 'El Año Lectivo pasara a Iniciado.'
        : 'El Año Lectivo se cerrara, no permitira nuevos registros.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: isActive ? 'Iniciar' : 'Cerrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: isActive ? '#198754' : '#f1f512',
    }).then((result) => {
      if (result.isConfirmed) {
        this.aniolectivoService.cambiarEstadoAnio(anio.id_anio_lectivo).subscribe({
          next: () => {
            if (isActive) {
              this.aniolectivoService.setAnioActivo({
                id_anio_lectivo: anio.id_anio_lectivo,
                anio: anio.anio,
                estado: 'INICIADO',
              });
            } else {
              this.aniolectivoService.limpiarAnioActivo();
            }

            // Luego recarga la tabla
            this.cargarAniosLectivos();

            Swal.fire({
              icon: 'success',
              title: 'Correcto',
              text: isActive ? 'Año Lectivo Iniciado.' : 'Año Lectivo Cerrado.',
              timer: 2000,
              showConfirmButton: false,
            });
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

  eliminarAnio(anio: AnioLectivo): void {
    Swal.fire({
      title: '¿Eliminar Año Registrado?',
      text: 'El Año Lectivo recien creado será eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
    }).then((result) => {
      if (result.isConfirmed) {
        this.aniolectivoService.eliminarAnio(anio.id_anio_lectivo).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',

              title: 'Año registrado eliminado',

              text: 'El año fue eliminado correctamente.',

              timer: 2000,

              showConfirmButton: false,
            });

            this.cargarAniosLectivos();
          },

          error: () => {
            Swal.fire({
              icon: 'error',

              title: 'Error',

              text: 'No se pudo eliminar el año lectivo.',
            });
          },
        });
      }
    });
  }

  validarAnio(event: any): void {
    event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 4);
  }
}
