import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AnioLectivoService } from '../../../core/services/aniolectivo.service';

@Component({
  selector: 'app-reg-anio-lectivo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reg-anio-lectivo.html',
  styleUrl: './reg-anio-lectivo.scss',
})
export class RegAnioLectivo {
  private fb = inject(FormBuilder);
  private aniolectivoService = inject(AnioLectivoService);
  form = this.fb.group({
    anio: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    nombre: ['', Validators.required],
    fecha_inicio: ['', Validators.required],
    fecha_fin: ['', Validators.required],
    observaciones: [''],
  });

  validarAnio(event: any): void {
    event.target.value = event.target.value.replace(/[^0-9]/g, '').slice(0, 4);
  }

  save(): void {
    // const confiPIN = this.getConfirmPin();
    // this.form.patchValue({
    //   pin: confiPIN,
    // });
    console.log(this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Complete la información obligatoria',
      });
      return;
    }
    console.log(this.form.getRawValue());
    this.aniolectivoService.registrarAnioLectivo(this.form.getRawValue()).subscribe({
      next: (res) => {
        Swal.fire({
          title: '✅ Año Lectivo Registrado',
          text: 'Se registro correctamente el Año Lectivo.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        }).then(() => {
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
}
