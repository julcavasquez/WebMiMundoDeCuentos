import { CommonModule } from '@angular/common';
import { signal, Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/roles';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { TipoDocumento } from '../../../core/models/tipos-doc';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './reg-usuarios.html',
  styleUrl: './reg-usuarios.scss',
})
export class RegUsuarios implements OnInit {
  constructor(private router: Router) {}

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
    tipoDocId: [''],
    num_doc: [''],
    nombres: [''],
    apellidos: [''],
    correo: [''],
    confircorreo: [''],
    password: [''],
    password2: [''],
    nom_usuario: [
      '',
      {
        disabled: true,
      },
    ],
    autoUsername: [true],
    pin: [''],
    confirpin: [''],
    avatarId: [''],
  });

  selectedAvatar = '';
  private previousRoleId: number | null = null;
  ngOnInit(): void {
    this.configinputmay_min();
    console.log('ngOnInit ejecutado');
    this.loadRoles();
    this.cargarTiposDoc();

    this.form.controls.nombres.valueChanges.subscribe(() => {
      if (this.form.controls.autoUsername.value) {
        this.ultimoAlumno((nextId) => {
          this.generateUsername(nextId);
        });
      }
    });

    this.form.controls.apellidos.valueChanges.subscribe(() => {
      if (this.form.controls.autoUsername.value) {
        this.ultimoAlumno((nextId) => {
          this.generateUsername(nextId);
        });
      }
    });
  }

  private resetRoleFields(): void {
    const currentRoleId = this.form.controls.roleId.value;
    this.form.reset({
      tipoDocId: '',
      roleId: currentRoleId,
      pin: '',
      autoUsername: true,
    });
    this.selectedAvatar = '';
    this.form.controls.nom_usuario.disable();
  }

  onRoleChange(): void {
    const roleId = Number(this.form.controls.roleId.value);
    this.clearValidators([
      'nombres',
      'apellidos',
      'correo',
      'password',
      'password2',
      'nom_usuario',
      'pin',
      'confirpin',
      'avatarId',
      'tipoDocId',
    ]);

    // ALUMNO
    if (roleId === 3) {
      this.updateValidators(
        ['nombres', 'apellidos', 'nom_usuario', 'avatarId'],
        [Validators.required],
      );
      this.updateValidators(['pin'], [Validators.required, Validators.minLength(6)]);
      this.updateValidators(['confirpin'], [Validators.required, Validators.minLength(6)]);
    } else {
      this.updateValidators(
        ['nombres', 'apellidos', 'correo', 'confircorreo', 'password', 'tipoDocId'],
        [Validators.required],
      );
      this.updateValidators(['correo', 'confircorreo'], [Validators.required, Validators.email]);
    }

    this.resetRoleFields();
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
    this.form.patchValue({
      avatarId: this.selectedAvatar,
    });
  }

  showPassword1 = false;

  togglePassword1(): void {
    this.showPassword1 = !this.showPassword1;
  }

  showPassword2 = false;

  togglePassword2(): void {
    this.showPassword2 = !this.showPassword2;
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
    this.usuarioService.registrarUsuarios(this.form.getRawValue()).subscribe({
      next: (res) => {
        Swal.fire({
          title: '✅ Usuario Registrado',
          text: 'Se registro correctamente el usuario.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          this.router.navigate(['/panel/usuarios']);
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
    this.validardigitosPIN();
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

  get showPinMessage(): boolean {
    return this.getPin().length === 6 && this.getConfirmPin().length === 6;
  }

  toggleUsernameMode(): void {
    const auto = this.form.controls.autoUsername.value;
    if (auto) {
      this.form.controls.nom_usuario.disable();
      this.ultimoAlumno((nextId) => {
        this.generateUsername(nextId);
      });
    } else {
      this.form.controls.nom_usuario.enable();
    }
  }

  generateUsername(nextId: Number): void {
    const nombres = this.form.controls.nombres.value ?? '';

    const apellidos = this.form.controls.apellidos.value ?? '';

    if (!nombres || !apellidos) {
      return;
    }
    const primerNombre = nombres.trim().split(' ')[0].toLowerCase();
    const partesApellidos = apellidos.trim().split(' ');
    const letraApellido1 = partesApellidos[0]?.charAt(0).toLowerCase() ?? '';
    const letraApellido2 = partesApellidos[1]?.charAt(0).toLowerCase() ?? '';
    const correlativo = nextId;
    const username = `${primerNombre}${letraApellido1}${letraApellido2}${correlativo}`;
    this.form.patchValue({
      nom_usuario: username,
    });
  }

  configinputmay_min() {
    this.form.controls.nombres.valueChanges.subscribe((value) => {
      this.form.controls.nombres.setValue(value?.toUpperCase() ?? '', { emitEvent: false });
    });

    this.form.controls.apellidos.valueChanges.subscribe((value) => {
      this.form.controls.apellidos.setValue(value?.toUpperCase() ?? '', { emitEvent: false });
    });

    this.form.controls.correo.valueChanges.subscribe((value) => {
      this.form.controls.correo.setValue(value?.toLowerCase() ?? '', { emitEvent: false });
    });
  }

  //UPDATE VALIDADORES SEGUN EL ROL
  private updateValidators(controls: string[], validators: ValidatorFn[]): void {
    controls.forEach((control) => {
      this.form.get(control)?.setValidators(validators);

      this.form.get(control)?.updateValueAndValidity();
    });
  }

  //LIMPIAR VALDIADORES DE LOS CAMPOS
  private clearValidators(controls: string[]): void {
    controls.forEach((control) => {
      this.form.get(control)?.clearValidators();
      this.form.get(control)?.updateValueAndValidity();
    });
  }

  get f() {
    return this.form.controls;
  }

  validardigitosPIN(): void {
    const pin = this.getPin();
    this.form.controls['pin'].setValue(pin, {
      emitEvent: false,
    });
  }
  validardigitosConfiPIN(): void {
    const confipin = this.getConfirmPin();
    this.form.controls['confirpin'].setValue(confipin, {
      emitEvent: false,
    });
  }

  ultimoAlumno(callback: (id: number) => void): void {
    this.usuarioService.getUltimoAlumno().subscribe({
      next: (response) => {
        callback(response.ultimoId + 1);
      },
    });
  }

  emailError = false;

  emailsMatch = false;

  validateEmails(): void {
    const correo = this.form.get('correo')?.value?.trim();
    const confirCorreo = this.form.get('confircorreo')?.value?.trim();
    if (!correo || !confirCorreo) {
      this.emailError = false;
      this.emailsMatch = false;
      return;
    }

    this.emailError = correo !== confirCorreo;
    this.emailsMatch = correo === confirCorreo;
  }

  documentoMaxLength = 0;
  nom_tipo = '';
  onTipoDocumentoChange(): void {
    const documento = this.form.get('num_doc');

    documento?.clearValidators();
    const tipoId = this.form.get('tipoDocId')?.value;

    const tipo = this.tipos_doc().find((t) => t.id_tdi == Number(tipoId));
    this.nom_tipo = String(tipo?.nombre);
    console.log(tipo?.nombre);

    switch (tipo?.nombre) {
      // DNI
      case 'DNI':
        documento?.setValidators([Validators.required, Validators.pattern(/^[0-9]{8}$/)]);
        this.documentoMaxLength = 8;
        break;

      // Carnet de Extranjería
      case 'CE':
        documento?.setValidators([Validators.required, Validators.pattern(/^[A-Za-z0-9]{9,12}$/)]);
        this.documentoMaxLength = 12;
        break;

      // Pasaporte
      case 'PASAPORTE':
        documento?.setValidators([Validators.required, Validators.pattern(/^[A-Za-z0-9]{6,12}$/)]);
        this.documentoMaxLength = 12;
        break;
    }

    documento?.updateValueAndValidity();
  }

  soloNumeros(event: KeyboardEvent): void {
    const tipoId = this.form.get('tipoDocId')?.value;

    const tipo = this.tipos_doc().find((t) => t.id_tdi == Number(tipoId));

    // Si es DNI solo permitir números
    if (tipo?.nombre === 'DNI') {
      const tecla = event.key;

      if (!/^[0-9]$/.test(tecla)) {
        event.preventDefault();
      }
    }
  }

  limpiarDocumento(): void {
    const tipoId = this.form.get('tipoDocId')?.value;

    const tipo = this.tipos_doc().find((t) => t.id_tdi == Number(tipoId));

    if (tipo?.nombre === 'DNI') {
      const control = this.form.get('num_doc');

      const valor = control?.value || '';

      control?.setValue(valor.replace(/\D/g, ''), { emitEvent: false });
    }
  }
}
