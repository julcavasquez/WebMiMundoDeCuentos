import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeccionesService } from '../../../core/services/secciones.service';
import { Secciones } from '../../../core/models/secciones';
import { AnioLectivoService } from '../../../core/services/aniolectivo.service';
import { Usuario } from '../../../core/models/usuario';
import { UsuariosService } from '../../../core/services/usuarios.service';
import Swal from 'sweetalert2';

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
  @HostListener('document:click', ['$event'])
  clickFuera(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.autocomplete')) {
      this.mostrarListaDocentes = false;
    }
  }
  textoBusqueda = new FormControl('');
  filtrarDocentes() {
    const texto = (this.textoBusqueda.value ?? '').trim().toLowerCase();

    if (!texto) {
      this.docentesDisponibles = [...this.docentes];

      return;
    }

    this.docentesDisponibles = this.docentes.filter(
      (docente: any) =>
        `${docente.nombres} ${docente.apellidos}`.toLowerCase().includes(texto) ||
        docente.correo.toLowerCase().includes(texto),
    );
  }
  seleccionarDocente(docente: any): void {
    this.docenteSeleccionado = docente;
    this.textoBusqueda.setValue(`${docente.nombres} ${docente.apellidos}`);
    //this.textoBusqueda = `${docente.nombres} ${docente.apellidos}`;
    this.form.patchValue({
      id_docente: docente.id_usu,
      id_seccion: this.seccion?.id_seccion,
    });
    this.mostrarListaDocentes = false;
  }
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
  private usuarioService = inject(UsuariosService);
  seccion: Secciones | null = null;
  /**
   * Lista original obtenida desde la API
   */
  docentes: any[] = [];
  docentesDisponibles: any[] = [];
  private fb = inject(FormBuilder);
  form = this.fb.group({
    id_docente: ['', Validators.required],
    id_seccion: [0, Validators.required],
    observaciones: [''],
  });

  docente: any = {
    nombres: '',
    correo: '',
    documento: '',
  };

  mostrarListaDocentes = false;

  docentesFiltrados: Usuario[] = [];

  //==============================
  // Lista de alumnos
  //==============================

  alumnos: any[] = [];
  private cd = inject(ChangeDetectorRef);

  //constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.docenteSeleccionado = null;
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
  siHayDocente: boolean = true;
  obtenerSeccion(id: number) {
    this.seccionService.getSeccionId(id).subscribe({
      next: (response: any) => {
        this.seccion = response.data;
        console.log(this.seccion);
        if (response.data.docente != null) {
          this.siHayDocente = true;
          this.docente.nombres = response.data.docente;
          this.docente.correo = response.data.correo;
          this.docente.documento = response.data.numero_documento;
        } else {
          this.siHayDocente = false;
        }
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

  limpiarSeleccion(): void {
    this.docenteSeleccionado = null;
    this.docentesDisponibles = [...this.docentes];
    this.textoBusqueda.setValue('');
    this.mostrarListaDocentes = true;
  }

  //=========================================
  // Saber si puede eliminar
  //=========================================

  get puedeEliminar(): boolean {
    return this.docente == null && this.alumnos.length == 0;
  }

  obtenerDocentesDisponibles() {
    console.log(this.anioLectivoActivo);
    this.usuarioService.getListaDocentes(this.anioLectivoActivo.id_anio_lectivo).subscribe({
      next: (response: any) => {
        this.docentes = response.data;
        this.docentesDisponibles = [...response.data];
        console.log(this.docentesDisponibles);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  abrirModalDocente() {
    this.obtenerDocentesDisponibles();
    this.mostrarModalDocente = true;
  }

  cerrarModalDocente() {
    this.docenteSeleccionado = null;
    this.mostrarModalDocente = false;
    this.form.reset({
      id_docente: '',
      id_seccion: 0,
      observaciones: '',
    });
    this.limpiarSeleccion();
  }

  guardarDocente() {
    if (!this.docenteSeleccionado) {
      return;
    }

    if (this.form.getRawValue().observaciones === '') {
      this.form.patchValue({
        observaciones: 'Primera asignación',
      });
    }

    console.log(this.form.getRawValue());
    this.usuarioService.asignarDocente(this.form.getRawValue()).subscribe({
      next: (res) => {
        Swal.fire({
          title: '✅ Docente Asignado',
          text: 'Se asigno correctamente el docente a la sección.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          // Cerrar modal
          this.obtenerSeccion(Number(this.form.getRawValue().id_seccion));
          this.cerrarModalDocente();
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

  btndocenteSeleccionado(docente: any) {
    this.docenteSeleccionado = docente;
    this.form.patchValue({
      id_docente: docente.id_usu,
      id_seccion: this.seccion?.id_seccion,
    });
    console.log(this.form.getRawValue());
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

  buscarDocentes(): void {
    const texto = this.textoBusquedaValor.trim().toLowerCase();
    if (texto.length < 2) {
      this.docentesFiltrados = [];
      this.mostrarListaDocentes = false;
      return;
    }

    this.docentesFiltrados = this.docentes.filter(
      (docente) =>
        `${docente.nombres} ${docente.apellidos}`.toLowerCase().includes(texto) ||
        docente.correo.toLowerCase().includes(texto),
    );

    this.mostrarListaDocentes = true;
  }

  abrirBusqueda(): void {
    this.mostrarListaDocentes = true;
  }

  get textoBusquedaValor(): string {
    return this.textoBusqueda.value ?? '';
  }
}
