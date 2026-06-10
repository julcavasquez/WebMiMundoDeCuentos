import { CommonModule } from '@angular/common';
import { signal, Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/roles';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { TipoDocumento } from '../../../core/models/tipos-doc';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-reg-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './reg-usuarios.html',
  styleUrl: './reg-usuarios.scss',
})
export class RegUsuarios implements OnInit {
  constructor() {
    console.log('REG-USUARIOS COMPONENTE');
  }

  private fb = inject(FormBuilder);
  private roleService = inject(RoleService);
  private usuarioService = inject(UsuariosService);

  @ViewChild('firstInput')
  firstInput!: ElementRef<HTMLInputElement>;

  @ViewChild('secondInput')
  secondInput!: ElementRef<HTMLInputElement>;

  @ViewChild('thirdInput')
  thirdInput!: ElementRef<HTMLInputElement>;

  @ViewChild('fourthInput')
  fourthInput!: ElementRef<HTMLInputElement>;

  @ViewChild('fifthInput')
  fifthInput!: ElementRef<HTMLInputElement>;

  @ViewChild('sixthInput')
  sixthInput!: ElementRef<HTMLInputElement>;

  @ViewChild('confirmFirstInput')
  confirmFirstInput!: ElementRef<HTMLInputElement>;

  @ViewChild('confirmSecondInput')
  confirmSecondInput!: ElementRef<HTMLInputElement>;

  @ViewChild('confirmThirdInput')
  confirmThirdInput!: ElementRef<HTMLInputElement>;

  @ViewChild('confirmFourthInput')
  confirmFourthInput!: ElementRef<HTMLInputElement>;

  @ViewChild('confirmFifthInput')
  confirmFifthInput!: ElementRef<HTMLInputElement>;

  @ViewChild('confirmSixthInput')
  confirmSixthInput!: ElementRef<HTMLInputElement>;

  roles = signal<Role[]>([]);
  tipos_doc = signal<TipoDocumento[]>([]);
  form = this.fb.group({
    roleId: ['', Validators.required],
    tipoDocId: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: [''],
    password: [''],
    password2: [''],
    nom_usuario: ['', Validators.required],
    autoUsername: [true],
    pin: [''],
    avatarId: this.fb.control<number | null>(null),
  });

  selectedAvatar = '';
  private previousRoleId: number | null = null;
  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.loadRoles();
    this.cargarTiposDoc();

    this.form.controls.roleId.valueChanges.subscribe((roleId) => {
      if (this.previousRoleId !== null && this.previousRoleId !== Number(roleId)) {
        this.resetRoleFields();
      }

      this.previousRoleId = Number(roleId);
    });

    this.form.controls.nombres.valueChanges.subscribe(() => {
      if (this.form.controls.autoUsername.value) {
        this.generateUsername();
      }
    });

    this.form.controls.apellidos.valueChanges.subscribe(() => {
      if (this.form.controls.autoUsername.value) {
        this.generateUsername();
      }
    });
  }

  private resetRoleFields(): void {
    const currentRoleId = this.form.controls.roleId.value;

    this.form.reset({
      tipoDocId: '',
      roleId: currentRoleId,
      pin: '',
    });

    this.selectedAvatar = '';
  }

  private loadRoles(): void {
    console.log('Antes de llamar API');
    this.roleService.getRoles().subscribe({
      next: (response) => {
        this.roles.set(response);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  private cargarTiposDoc(): void {
    console.log('Antes de llamar API');
    this.usuarioService.getAllTipoDoc().subscribe({
      next: (response) => {
        this.tipos_doc.set(response);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  avatars: string[] = [
    '/assets/images/avatars/robot.png',
    '/assets/images/avatars/extratereste.png',
    '/assets/images/avatars/buho.png',
    '/assets/images/avatars/dragon.png',
  ];

  get isStudent(): boolean {
    const roleId = this.form.controls.roleId.value;
    return Number(roleId) === 3;
  }

  selectAvatar(avatar: string): void {
    this.selectedAvatar = avatar;
  }

  showPassword1 = false;

  togglePassword1(): void {
    this.showPassword1 = !this.showPassword1;
  }

  showPassword2 = false;

  togglePassword2(): void {
    this.showPassword2 = !this.showPassword2;
  }

  save() {
    console.log(this.form.value);

    this.usuarioService.registrarUsuarios(this.form.value).subscribe({
      next: (res) => {
        alert('Usuario registrado correctamente ✅');

        // 👉 Redirigir al home
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  handlePinInput(event: Event, nextInput?: HTMLInputElement): void {
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

  handleLastPinInput(event: Event, button: HTMLButtonElement): void {
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
      this.validatePin();
    }
  }

  movePrevious(event: KeyboardEvent, previousInput: HTMLInputElement): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && input.value === '') {
      previousInput.focus();
    }
  }

  onNumberInput(event: KeyboardEvent): void {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  getPin(): string {
    return [
      this.firstInput?.nativeElement?.value ?? '',

      this.secondInput?.nativeElement?.value ?? '',

      this.thirdInput?.nativeElement?.value ?? '',

      this.fourthInput?.nativeElement?.value ?? '',

      this.fifthInput?.nativeElement?.value ?? '',

      this.sixthInput?.nativeElement?.value ?? '',
    ].join('');
  }

  getConfirmPin(): string {
    return [
      this.confirmFirstInput.nativeElement.value,

      this.confirmSecondInput.nativeElement.value,

      this.confirmThirdInput.nativeElement.value,

      this.confirmFourthInput.nativeElement.value,

      this.confirmFifthInput.nativeElement.value,

      this.confirmSixthInput.nativeElement.value,
    ].join('');
  }

  pinError = false;

  validatePin(): void {
    const pin = this.getPin();

    const confirmPin = this.getConfirmPin();

    this.pinError = pin.length === 6 && confirmPin.length === 6 && pin !== confirmPin;
  }

  toggleUsernameMode(): void {
    const auto = this.form.controls.autoUsername.value;

    if (auto) {
      this.form.controls.nom_usuario.disable();

      this.generateUsername();
    } else {
      this.form.controls.nom_usuario.enable();
    }
  }

  generateUsername(): void {
    const nombres = this.form.controls.nombres.value ?? '';

    const apellidos = this.form.controls.apellidos.value ?? '';

    if (!nombres || !apellidos) {
      return;
    }

    const primerNombre = nombres.trim().split(' ')[0].toLowerCase();

    const partesApellidos = apellidos.trim().split(' ');

    const letraApellido1 = partesApellidos[0]?.charAt(0).toLowerCase() ?? '';

    const letraApellido2 = partesApellidos[1]?.charAt(0).toLowerCase() ?? '';

    const correlativo = 100;

    const username = `${primerNombre}${letraApellido1}${letraApellido2}${correlativo}`;

    this.form.patchValue({
      nom_usuario: username,
    });
  }
}
