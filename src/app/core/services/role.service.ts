import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Role } from '../models/roles';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private http = inject(HttpClient);

  getRoles(): Observable<Role[]> {

    return this.http.get<Role[]>(
      `${API_CONFIG.BASE_URL}/roles`
    );

  }

}