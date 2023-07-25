import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from 'src/app/interface/secure';
import { environment } from 'env';

type NewType = Equipo;

@Injectable({
  providedIn: 'root'
})

export class EquipoService {
  private apiUrlEquip = environment.apiUrlEquip;

  constructor(private http: HttpClient) { }

  getEquipos(id: number): Observable<Equipo> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrlEquip}/${id}`;
    return this.http.get<Equipo>(url, { headers });
  }

  getEquipo(): Observable<NewType[]> {
    return this.http.get<Equipo[]>(`${this.apiUrlEquip}/`);
  }

  createEquipo(equipo: Equipo): Observable<Equipo> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrlEquip}/`;
    return this.http.post<Equipo>(url, equipo, { headers });
  }

  updateEquipo(id: number, persona: Equipo): Observable<Equipo> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrlEquip}/${id}`;
    return this.http.put<Equipo>(url, persona, { headers });
  }

  deleteEquipo(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrlEquip}/${id}`;
    return this.http.delete<void>(url, { headers });
  }
}
