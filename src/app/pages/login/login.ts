import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

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

  role = '';

  roleType: 'general' | 'alumno' = 'general';

  roleTitle = '';

  roleColor = '';

  roleImage = '';

  loginForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.role = this.route.snapshot.paramMap.get('role') || '';

    this.loadRoleData();

    this.buildForm();

  }

  loadRoleData(): void {

    switch (this.role) {

      case 'admin':

        this.roleTitle = 'Administrador';
        this.roleColor = '#8b5cf6';
        this.roleImage = '/assets/images/roles/admin.jpeg';
        this.roleType = 'general';

        break;

      case 'docentes':

        this.roleTitle = 'Docente';
        this.roleColor = '#22c55e';
        this.roleImage = '/assets/images/roles/docentes.jpeg';
        this.roleType = 'general';

        break;

      case 'padres':

        this.roleTitle = 'Padre o Madre';
        this.roleColor = '#ec4899';
        this.roleImage = '/assets/images/roles/padres.jpeg';
        this.roleType = 'general';

        break;

      case 'alumno':

        this.roleTitle = 'Alumno';
        this.roleColor = '#facc15';
        this.roleImage = '/assets/images/roles/alumno.jpeg';
        this.roleType = 'alumno';

        break;

    }

  }

  buildForm(): void {

    if (this.roleType === 'general') {

      this.loginForm = this.fb.group({

        email: [
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

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    console.log(this.loginForm.value);

  }

  avatars: string[] = [

  '/assets/images/avatars/robot.png',
  '/assets/images/avatars/extratereste.png',
  '/assets/images/avatars/buho.png',
  '/assets/images/avatars/dragon.png'

];

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