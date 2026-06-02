import { CommonModule } from '@angular/common';
import { signal, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/roles';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-reg-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './reg-usuarios.html',
  styleUrl: './reg-usuarios.scss',
})
export class RegUsuarios implements OnInit{
  constructor() {
  console.log('REG-USUARIOS COMPONENTE');
}

  private fb = inject(FormBuilder);
   private roleService = inject(RoleService);
   private usuarioService = inject(UsuariosService);
  roles = signal<Role[]>([]);
  form = this.fb.group({
    roleId: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: [''],
    password: [''],
    password2: [''],
    nom_usuario: [''],
    pin: [''],
    avatarId: this.fb.control<number | null>(null)
  });

  selectedAvatar = '';
private previousRoleId: number | null = null;
  ngOnInit(): void {
     console.log('ngOnInit ejecutado');
    this.loadRoles();

    

      this.form.controls.roleId.valueChanges
    .subscribe(roleId => {

      if (
        this.previousRoleId !== null &&
        this.previousRoleId !== Number(roleId)
      ) {

        this.resetRoleFields();

      }

      this.previousRoleId = Number(roleId);

    });


  }

  private resetRoleFields(): void {

  const currentRoleId =
    this.form.controls.roleId.value;

  this.form.reset({

    roleId: currentRoleId,
    pin:""
  });

  this.selectedAvatar = "";


}

  private loadRoles(): void {
 console.log('Antes de llamar API');
    this.roleService
      .getRoles()
      .subscribe({

        next: (response) => {
           console.log('Roles:', response);
          this.roles.set(response);
          console.log('Cantidad cargada:', this.roles.length);
          

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

   avatars: string[] = [
      '/assets/images/avatars/robot.png',
      '/assets/images/avatars/extratereste.png',
      '/assets/images/avatars/buho.png',
      '/assets/images/avatars/dragon.png'

    ];


  get isStudent(): boolean {

     const roleId = this.form.controls.roleId.value;
     console.log(roleId);
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
      }
    });
  }
}
