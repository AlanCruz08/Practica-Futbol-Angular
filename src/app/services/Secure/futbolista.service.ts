import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Futbolista } from 'src/app/interface/futbolista';
import { environment } from 'env';

type NewType = Futbolista;

@Injectable({
  providedIn: 'root'
})

export class FutbolistasService{

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /*getFutbolista(): Observable<NewType[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    return this.http.get<Futbolista[]>(`${this.apiUrl}/`, { headers });
  }*/

  getFutbolistas(id: number): Observable<Futbolista> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Futbolista>(url, { headers });
  }

  getFutbolista(): Observable<NewType[]> {
    return this.http.get<Futbolista[]>(`${this.apiUrl}/`);
  }

  createPersona(persona: Futbolista): Observable<Futbolista> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrl}/`;
    return this.http.post<Futbolista>(url, persona, { headers });
  }

  updatePersona(id: number, persona: Futbolista): Observable<Futbolista> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Futbolista>(url, persona, { headers });
  }

  deletePersona(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }
}
