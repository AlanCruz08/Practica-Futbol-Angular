import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estadio } from 'src/app/interface/secure';
import { environment } from 'env';

type NewType = Estadio;

@Injectable({
  providedIn: 'root'
})
export class EstadioService {

  private apiUrlEstad = environment.apiUrlEstad;
  constructor(private http:HttpClient) {  }

  getEstadio(id:number): Observable<Estadio> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrlEstad}/${id}`;
    return this.http.get<Estadio>(url, { headers });
  }

  getEstadios(): Observable<NewType[]> {
    return this.http.get<Estadio[]>(`${this.apiUrlEstad}/`);
  }

  createEstadio(estadio: Estadio): Observable<Estadio>
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrlEstad}/`;
    return this.http.post<Estadio>(url, estadio, { headers });
  }
  updateEstadio(id: number, estadio: Estadio): Observable<Estadio>
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrlEstad}/${id}`;
    return this.http.put<Estadio>(url, estadio, { headers });
  }

  deleteEstadio(id: number): Observable<void>{
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
  const url = `${this.apiUrlEstad}/${id}`;
  return this.http.delete<void>(url, { headers });
  }
}
