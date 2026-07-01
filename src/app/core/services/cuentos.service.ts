import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { TemaCuento } from '../models/temas';
@Injectable({
  providedIn: 'root',
})
export class CuentosService {
  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.BASE_URL + '/cuentos';

  generarPortada(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generar-portada`, data);
  }

  listTemas(): Observable<TemaCuento[]> {
    return this.http.get<TemaCuento[]>(`${this.apiUrl}/list-temas`);
  }

  generarCuento(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generar-cuento`, data);
  }
}
