import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {

  // simulación (luego lo obtendrás del token JWT o backend)
  private role: string = 'admin';

  getRole(): string {
    return this.role;
  }

  setRole(role: string): void {
    this.role = role;
  }

  logout(): void {
    console.log("Sesión cerrada");
  }
}