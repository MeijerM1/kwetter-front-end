import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../../domain/Response';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = `${environment.API_BASE}/roles`;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl);
  }

  public get(uuid: string): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/${uuid}`);
  }

  public checkRole(uuid: string, expected: string): Observable<boolean> {
    return this.http.get<any>(`${this.baseUrl}/${uuid}`)
      .pipe(map((response) => {
        return response.payload.name === expected;
      }));
  }
}
