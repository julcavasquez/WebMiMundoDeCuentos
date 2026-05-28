import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthLogin } from '../../core/services/auth-login';
import { MENU_ITEMS } from '../../core/config/menu.config';
import { MenuItem } from '../../core/models/menu-item';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {

  private authService = inject(AuthLogin);

  isSidebarCollapsed = false;

  role = this.authService.getRole();

  menuItems: MenuItem[] = MENU_ITEMS.filter(item =>
    item.roles.includes(this.role)
  );

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
  }
}
