import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Division } from 'src/app/interface/secure';
import { environment } from 'env';

type NewType = Division;

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private apiUrl = environment.apiUrl;
  private apiUrlDiv = environment.apiUrlDiv;
  constructor(private htttp: HttpClient) { }


  getDivision(id:number): Observable<Division> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrl}/${id}`;
    return this.htttp.get<Division>(url, { headers });
}

  getDivisiones(): Observable<NewType[]> {
  return this.htttp.get<Division[]>(`${this.apiUrlDiv}/`);
  }

  createDivision(division: Division): Observable<Division>
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrl}/`;
    return this.htttp.post<Division>(url, division, { headers });
  }

  updateDivision(id: number, division: Division): Observable<Division>
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrl}/${id}`;
    return this.htttp.put<Division>(url, division, { headers });
  }

  deleteDivision(id: number): Observable<void>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ "Accept": "application/json", "Authorization": `Bearer ${token}` });
    const url = `${this.apiUrl}/${id}`;
    return this.htttp.delete<void>(url, { headers });
  }
}
