import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeccionesService } from '../../../core/services/secciones.service';
import { Secciones } from '../../../core/models/secciones';
import { AnioLectivoService } from '../../../core/services/aniolectivo.service';

@Component({
  selector: 'app-gestionar-seccion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './gestionar-seccion.html',
  styleUrl: './gestionar-seccion.scss',
})
export class GestionarSeccion implements OnInit {
  idSeccion!: number;
  private aniolectivoService = inject(AnioLectivoService);
  anioLectivoActivo: any = null;
  mostrarModalDocente = false;
  mostrarModalAlumno = false;
  //docentesDisponibles: any[] = [];
  alumnosDisponibles: any[] = [];
  alumnosSeleccionados: any = [];
  docenteSeleccionado: any = [];
  private activatedRoute = inject(ActivatedRoute);
  private seccionService = inject(SeccionesService);
  seccion: Secciones | null = null;
  //==============================
  // Carga al iniciar componente
  //==============================

  //==============================
  // Información de la sección
  //==============================

  //==============================
  // Docente
  //==============================

  docente: any = {
    id_docente: 5,

    nombres: 'María Pérez López',

    correo: 'mperez@colegio.edu',

    dni: '12345678',

    foto: 'assets/img/avatar-docente.png',
  };

  docentesDisponibles: any[] = [
    {
      id_docente: 1,

      nombres: 'María Pérez López',

      correo: 'mperez@colegio.edu',

      dni: '12345678',

      foto: 'assets/img/avatar-docente.png',
    },
    {
      id_docente: 2,

      nombres: 'María Pérez López',

      correo: 'mperez@colegio.edu',

      dni: '12345678',

      foto: 'assets/img/avatar-docente.png',
    },
    {
      id_docente: 3,

      nombres: 'María Pérez López',

      correo: 'mperez@colegio.edu',

      dni: '12345678',

      foto: 'assets/img/avatar-docente.png',
    },
  ];

  //==============================
  // Lista de alumnos
  //==============================

  alumnos: any[] = [
    {
      id: 1,
      nombres: 'Juan Martínez García',
      dni: '87654321',
      correo: 'juan@correo.com',
      fecha: '10/03/2026',
    },

    {
      id: 2,
      nombres: 'Lucía Sánchez Ramírez',
      dni: '87654322',
      correo: 'lucia@correo.com',
      fecha: '11/03/2026',
    },

    {
      id: 3,
      nombres: 'Carlos Rodríguez Díaz',
      dni: '87654323',
      correo: 'carlos@correo.com',
      fecha: '11/03/2026',
    },
  ];
  private cd = inject(ChangeDetectorRef);

  //constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const idSeccion = Number(params['id_seccion']);
      this.obtenerSeccion(idSeccion);
      this.aniolectivoService.anioActivo$.subscribe((anio) => {
        this.anioLectivoActivo = anio;
      });
      const content = document.querySelector('.content');
      content?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.obtenerDocente();

      this.obtenerAlumnos();
    });
  }

  //=========================================
  // Obtener información de la sección
  //=========================================

  obtenerSeccion(id: number) {
    this.seccionService.getSeccionId(id).subscribe({
      next: (response: any) => {
        this.seccion = response.data;
        this.cd.markForCheck();
        console.log(this.seccion?.grado);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  //=========================================
  // Obtener docente
  //=========================================

  obtenerDocente() {
    console.log('Obtener docente');
  }

  //=========================================
  // Obtener alumnos
  //=========================================

  obtenerAlumnos() {
    console.log('Obtener alumnos');
  }

  //=========================================
  // Cambiar docente
  //=========================================

  cambiarDocente() {
    console.log('Cambiar docente');
  }

  //=========================================
  // Agregar alumnos
  //=========================================

  agregarAlumnos() {
    console.log('Agregar alumnos');
  }

  //=========================================
  // Quitar alumno
  //=========================================

  quitarAlumno(alumno: any) {
    console.log(alumno);
  }

  //=========================================
  // Eliminar sección
  //=========================================

  eliminarSeccion() {
    console.log('Eliminar sección');
  }

  //=========================================
  // Saber si puede eliminar
  //=========================================

  get puedeEliminar(): boolean {
    return this.docente == null && this.alumnos.length == 0;
  }

  obtenerDocentesDisponibles() {}
  abrirModalDocente() {
    this.obtenerDocentesDisponibles();
    this.mostrarModalDocente = true;
  }

  cerrarModalDocente() {
    this.docenteSeleccionado = null;

    this.mostrarModalDocente = false;
  }

  guardarDocente() {
    if (!this.docenteSeleccionado) {
      return;
    }

    console.log(this.docenteSeleccionado);

    this.cerrarModalDocente();
  }

  seleccionarAlumno(alumno: any) {
    const existe = this.alumnosSeleccionados.find((x: { id: any }) => x.id === alumno.id);

    if (existe) {
      this.alumnosSeleccionados = this.alumnosSeleccionados.filter(
        (x: { id: any }) => x.id !== alumno.id,
      );
    } else {
      this.alumnosSeleccionados.push(alumno);
    }
  }

  estaSeleccionado(alumno: any) {
    return this.alumnosSeleccionados.some((x: { id: any }) => x.id === alumno.id);
  }

  abrirModalAlumno() {
    this.mostrarModalAlumno = true;
  }

  cerrarModalAlumno() {
    this.alumnosSeleccionados = [];
    this.mostrarModalAlumno = false;
  }
  guardarAlumnos() {
    console.log(this.alumnosSeleccionados);
  }
}
