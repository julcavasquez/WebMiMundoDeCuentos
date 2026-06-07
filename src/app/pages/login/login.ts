import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../core/services/role.service';
import { Role } from '../../core/models/roles';
import { UsuariosService } from '../../core/services/usuarios.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  submitted = false;
  loginForm!: FormGroup;
private activatedRoute = inject(ActivatedRoute);
 private roleService = inject(RoleService);
 private usuariosService = inject(UsuariosService);
roles = signal<Role[]>([]);
selectedRole = signal<Role | null>(null);
  constructor(
    private fb: FormBuilder,
    private router: Router  
  ) {}

  ngOnInit(): void {

    const roleId = Number(
    this.activatedRoute.snapshot.paramMap.get('roleId')
  );

  this.roleService
    .getRoles()
    .subscribe({

      next: (response) => {
        this.roles.set(response);

        const role = response.find(
          r => r.id === roleId
        );

        if (role) {

          this.selectedRole.set(role);

          console.log(this.selectedRole()?.tipo);
           this.buildForm();

        }

      }

    });

   

  }


  buildForm(): void {
   console.log(this.selectedRole()?.tipo);
    if (this.selectedRole()?.tipo === 'GENERAL') {
      this.loginForm = this.fb.group({

        correo: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ]

      });

    } else {

      this.loginForm = this.fb.group({

        username: [
          '',
          Validators.required
        ],

        pin: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6)
          ]
        ]

      });

    }

  }

  goBack(): void {

    this.router.navigate(['/bienvenido']);

  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.usuariosService
    .login(
      this.loginForm.getRawValue()
    )
    .subscribe({
      next: (response: any) => {
        Swal.fire({
            title: '✅ Login exitoso',
            text: 'Bienvenido',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/panel']);
            // if(res.rol == 'ADMINISTRADOR'){
            // this.router.navigate(['/admin/dashboard']);
            // }else{
            //   if(res.rol == 'estudiante'){
            //     this.router.navigate(['/estudiante/panel']);
            //   }
            // }
          });
        localStorage.setItem(
          'token',response.token

        );
        localStorage.setItem(
          'user',JSON.stringify(response.user)
        );

      },

      error: (error) => {
         console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text:
            'Correo o contraseña incorrectos'
        });

      }

    });


  }

  avatars: string[] = [

  '/assets/images/avatars/robot.png',
  '/assets/images/avatars/extratereste.png',
  '/assets/images/avatars/buho.png',
  '/assets/images/avatars/dragon.png'

];

  get f() {
    return this.loginForm.controls;
  }

selectedAvatar = '';

selectAvatar(avatar: string): void {

  this.selectedAvatar = avatar;

}

handlePinInput(
  event: Event,
  nextInput?: HTMLInputElement,
): void {

  const input = event.target as HTMLInputElement;

  // SOLO números
  input.value = input.value.replace(/[^0-9]/g, '');

  // Si escribió número
  if (input.value.length === 1) {

    // Mostrar número momentáneamente
    input.type = 'text';

    // Luego ocultar
    setTimeout(() => {

      input.type = 'password';

    }, 500);

    // Focus siguiente input
    if (nextInput) {

      nextInput.focus();

    }

  }

}

handleLastPinInput(
  event: Event,
  button: HTMLButtonElement
): void {

  const input = event.target as HTMLInputElement;

  // SOLO números
  input.value = input.value.replace(/[^0-9]/g, '');

  // Si escribió
  if (input.value.length === 1) {

    // Mostrar momentáneamente
    input.type = 'text';

    setTimeout(() => {

      input.type = 'password';

    }, 500);

    // Focus botón
    setTimeout(() => {

      button.focus();

    }, 100);

  }

}

movePrevious(
  event: KeyboardEvent,
  previousInput: HTMLInputElement
): void {

  const input = event.target as HTMLInputElement;

  if (
    event.key === 'Backspace' &&
    input.value === ''
  ) {

    previousInput.focus();

  }

}

onNumberInput(
  event: KeyboardEvent
): void {

  if (!/^[0-9]$/.test(event.key)) {

    event.preventDefault();

  }

}

}