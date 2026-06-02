import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private http = inject(HttpClient);
 private apiUrl = API_CONFIG.BASE_URL+'/usuarios';
  registrarUsuarios(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

}