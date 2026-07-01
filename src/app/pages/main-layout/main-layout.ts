import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthLogin } from '../../core/services/auth-login';
import { MENU_ROL } from '../../core/config/menu.config';
import { MenuItem } from '../../core/models/menu-item';
import { MatIconModule } from '@angular/material/icon';
import { AnioLectivoService } from '../../core/services/aniolectivo.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatIconModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayoutComponent implements OnInit {
  private authService = inject(AuthLogin);
  private aniolectivoService = inject(AnioLectivoService);
  private cd = inject(ChangeDetectorRef);
  isSidebarCollapsed = false;
  menuItems: MenuItem[] = [];
  anioActivo: any = null;
  ngOnInit(): void {
    const user = this.authService.getUsuarioLogueado();
    console.log(user);
    if (user) {
      this.menuItems = MENU_ROL[user.rolId] || [];
      console.log(this.menuItems);
    }
    //Consulta al cargar el sistema
    this.aniolectivoService.cargarAnioActivo();

    //Escucha cambios
    this.aniolectivoService.anioActivo$.subscribe((anio) => {
      this.anioActivo = anio;
      this.cd.markForCheck();
    });
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
  }
}
