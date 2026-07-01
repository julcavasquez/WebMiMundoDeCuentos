import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Secciones } from '../models/secciones';

@Injectable({
  providedIn: 'root',
})
export class SeccionesService {
  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.BASE_URL + '/secciones';

  registrarSeccion(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-seccion`, data);
  }

  getAllSecciones(id: number): Observable<Secciones[]> {
    return this.http.get<Secciones[]>(`${this.apiUrl}/${id}/list-secciones`);
  }

  getSeccionId(id: number) {
    return this.http.get<Secciones[]>(`${this.apiUrl}/${id}/gestionar-seccion`, {});
  }
}
