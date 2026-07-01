import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { AnioLectivo } from '../models/anio_lectivo';

@Injectable({
  providedIn: 'root',
})
export class AnioLectivoService {
  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.BASE_URL + '/anioslectivos';
  private anioActivoSubject = new BehaviorSubject<any>(null);
  anioActivo$ = this.anioActivoSubject.asObservable();

  registrarAnioLectivo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-anio`, data);
  }

  getAllAnios(): Observable<AnioLectivo[]> {
    return this.http.get<AnioLectivo[]>(`${this.apiUrl}/list-anios`);
  }

  cargarAnioActivo(): void {
    this.http.get<any>(`${this.apiUrl}/anio-activo`).subscribe({
      next: (resp) => {
        this.anioActivoSubject.next(resp.data);
      },
      error: () => {
        this.anioActivoSubject.next(null);
      },
    });
  }

  setAnioActivo(anio: any) {
    this.anioActivoSubject.next(anio);
  }

  limpiarAnioActivo() {
    this.anioActivoSubject.next(null);
  }

  cambiarEstadoAnio(id: number) {
    return this.http.patch(`${this.apiUrl}/${id}/update-estado`, {});
  }

  eliminarAnio(id: number) {
    return this.http.patch(`${this.apiUrl}/${id}/eliminar`, {});
  }
}
