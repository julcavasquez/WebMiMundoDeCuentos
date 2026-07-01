import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { TipoDocumento } from '../models/tipos-doc';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.BASE_URL + '/usuarios';

  registrarUsuarios(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getAllUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list-usuarios`);
  }

  getAllTipoDoc(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.apiUrl}/list-tiposdoc`);
  }

  cambiarEstadoUsuario(id: number) {
    return this.http.patch(`${this.apiUrl}/${id}/update-estado`, {});
  }

  eliminarUsuario(id: number) {
    return this.http.patch(`${this.apiUrl}/${id}/eliminar`, {});
  }

  getUltimoAlumno(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ultimo-alumno`);
  }
}
