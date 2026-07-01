import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnioLectivoService } from '../../../core/services/aniolectivo.service';
import { disabled } from '@angular/forms/signals';
import { SeccionesService } from '../../../core/services/secciones.service';
import { Secciones } from '../../../core/models/secciones';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-secciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './list-secciones.html',
  styleUrl: './list-secciones.scss',
})
export class ListSecciones {
  editando = false;
  private aniolectivoService = inject(AnioLectivoService);
  private seccionesService = inject(SeccionesService);
  listaSecciones = signal<Secciones[]>([]);
  anioLectivoActivo: any = null;
  private fb = inject(FormBuilder);
  form = this.fb.group({
    id_anio_lectivo: [null],
    anio: [null],
    grado: ['3', Validators.required],
    seccion: ['', Validators.required],
    nombre: ['', Validators.required],
  });
  mostrarModal = false;

  ngOnInit(): void {
    this.aniolectivoService.anioActivo$.subscribe((anio) => {
      this.anioLectivoActivo = anio;
      if (anio) {
        this.cargarSecciones(this.anioLectivoActivo.id_anio_lectivo);
        this.form.patchValue({
          id_anio_lectivo: anio.id_anio_lectivo,
          anio: anio.anio,
        });
      }
    });
    this.selectSeccion();
  }

  seccionesDisponibles: string[] = [];

  private readonly todasLasSecciones = ['A', 'B', 'C', 'D', 'E', 'F'];

  obtenerSeccionesDisponibles() {
    const registradas = this.listaSecciones().map((s) => s.seccion);
    this.seccionesDisponibles = this.todasLasSecciones.filter(
      (letra) => !registradas.includes(letra),
    );
  }
  guardarSeccion() {
    console.log(this.form.getRawValue());
    this.seccionesService.registrarSeccion(this.form.getRawValue()).subscribe({
      next: (res) => {
        Swal.fire({
          title: '✅ Sección Registrada',
          text: 'Se registro correctamente la Sección.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          this.cargarSecciones(Number(this.form.getRawValue().id_anio_lectivo));
          // Cerrar modal
          this.cerrarModal();
          //this.router.navigate(['/panel/usuarios']);
          // if(res.rol == 'ADMINISTRADOR'){
          // this.router.navigate(['/admin/dashboard']);
          // }else{
          //   if(res.rol == 'estudiante'){
          //     this.router.navigate(['/estudiante/panel']);
          //   }
          // }
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'Ocurrió un error inesperado',
        });
      },
    });
  }

  selectSeccion() {
    this.form.get('seccion')?.valueChanges.subscribe((letra) => {
      if (!letra) {
        this.form.patchValue(
          {
            nombre: '',
          },
          { emitEvent: false },
        );

        return;
      }

      this.form.patchValue(
        {
          nombre: `3° "${letra}"`,
        },
        { emitEvent: false },
      );
    });
  }

  private cargarSecciones(id_anio: number): void {
    this.seccionesService.getAllSecciones(id_anio).subscribe({
      next: (response: any) => {
        this.listaSecciones.set(response);
        this.obtenerSeccionesDisponibles();
        console.log(response);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  nuevaSeccion() {
    this.obtenerSeccionesDisponibles();
    if (this.seccionesDisponibles.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Secciones completas',
        text: 'Todas las secciones ya fueron registradas.',
      });

      return;
    }

    this.editando = false;
    this.anioLectivoActivo.value = this.aniolectivoService.anioActivo$;
    console.log(this.anioLectivoActivo);
    this.form.reset({
      id_anio_lectivo: this.anioLectivoActivo.id_anio_lectivo,
      anio: this.anioLectivoActivo.anio,
      grado: '3',
      seccion: '',
    });

    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.form.reset();

    this.editando = false;

    this.mostrarModal = false;
  }
}
