import { ChangeDetectorRef, Component, Inject, inject, OnInit, signal } from '@angular/core';
import { CuentosService } from '../../../core/services/cuentos.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TemaCuento } from '../../../core/models/temas';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-cuento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './crear-cuento.html',
  styleUrl: './crear-cuento.scss',
})
export class CrearCuento implements OnInit {
  private cuentosService = inject(CuentosService);
  temas = signal<TemaCuento[]>([]);
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.cargarTemas();
  }

  private fb = inject(FormBuilder);
  imagePreview = '';
  form = this.fb.group({
    titulo: ['', Validators.required],
    tema: ['', Validators.required],
    dificultad: ['', Validators.required],
    personajePrincipal: ['', Validators.required],
    escenario: ['', Validators.required],
    trama: ['', Validators.required],
    contenido: ['', Validators.required],
  });
  loadingCuento = false;
  private CuentosService = inject(CuentosService);

  generarPortada(): void {
    const titulo = this.form.value.titulo;

    if (!titulo) {
      alert('Ingrese el título');

      return;
    }

    this.CuentosService.generarPortada(this.form.value).subscribe({
      next: (response: any) => {
        this.imagePreview = response.imageUrl;
        console.log(this.imagePreview);
      },

      error: () => {},
    });
  }
  save() {}

  generaCuento() {
    this.loadingCuento = true;
    setTimeout(() => {
      this.cuentosService
        .generarCuento({
          titulo: this.form.value.titulo,
          tema: this.form.value.tema,
          dificultad: this.form.value.dificultad,
          escenario: this.form.value.escenario,
          personajePrincipal: this.form.value.personajePrincipal,
          trama: this.form.value.trama,
        })
        .subscribe({
          next: (response: any) => {
            this.form.patchValue({
              contenido: response.data.cuento,
            });
            this.loadingCuento = false;
            this.currentStep++;
          },
          error: (error) => {
            console.log(error);
            this.loadingCuento = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo regenerar el cuento.',
            });
          },
        });
    }, 100);
  }

  currentStep = 1;

  nextStep(): void {
    if (this.currentStep < 2) {
      this.generaCuento();
      const content = document.querySelector('.content');
      content?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.form.controls.titulo.disable();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.form.controls.titulo.enable();
    }
  }

  cargarTemas(): void {
    this.cuentosService.listTemas().subscribe({
      next: (response) => {
        this.temas.set(response);
      },
    });
  }

  get cantidadPalabras(): number {
    const texto = this.form.get('contenido')?.value || '';

    return texto
      .trim()
      .split(/\s+/)
      .filter((p) => p.length > 0).length;
  }

  get cantidadCaracteres(): number {
    const texto = this.form.get('contenido')?.value || '';

    return texto.length;
  }

  editandoCuento = false;

  btnEdicion(): void {
    this.editandoCuento = !this.editandoCuento;
    Swal.fire({
      title: '✅ Editar Cuento',
      text: 'Se habilito el contenido para que pueda realizar cambios.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2bdb08',
    });
  }

  btnGuardarCambios(): void {
    this.editandoCuento = false;
    Swal.fire({
      title: '✅ Cambios Guardados',
      text: 'Se guardaron los cambios realizados',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
    });
  }

  regeneraciones = 0;

  maxRegeneraciones = 3;

  regenerarCuento(): void {
    if (this.regeneraciones >= this.maxRegeneraciones) {
      return;
    }

    Swal.fire({
      title: 'Regenerar Cuento',
      text: 'Se va a volver a generar el contenido del Cuento.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, regenerar',
      cancelButtonText: 'No',
      confirmButtonColor: '#8ed630',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingCuento = true;
        this.cuentosService.generarCuento(this.form.value).subscribe({
          next: (resp: any) => {
            this.loadingCuento = false;
            this.regeneraciones++;
            this.cdr.detectChanges();
            this.form.patchValue({
              contenido: resp.data.cuento,
            });
          },
        });
      }
    });
  }
}
