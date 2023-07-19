import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, Register, Logout } from 'src/app/interface/login';
import { environment } from 'env';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  headers: HttpHeaders;

  private apiUrlSP = environment.apiUrlSP;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ "Accept": "application/json", "Ahutorization": "Bearer " });
  }

  validacion(token: string){
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const resp = this.http.post(`${this.apiUrlSP}/validate`, token, {headers: headers});
    return resp;
  }

  logout(credentials: Logout): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });

      return this.http.post(`${this.apiUrlSP}/logout`, credentials, { headers: headers }).pipe(
        catchError((error) => {
          // Manejar el error aquí según tus necesidades
          return throwError(error);
        })
      );
    } else {
      window.location.href = environment.webUrl + '/';
      console.log('Token not found');
      return throwError('Token not found');
    }
  }

  login(credentials: Login) {
    return this.http.post(`${this.apiUrlSP}/login`, credentials);
  }

  register(credentials: Register) {
    return this.http.post(`${this.apiUrlSP}/register`, credentials);
  }




  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

}
