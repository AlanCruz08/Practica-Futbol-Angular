import { Component } from '@angular/core';
import { Estadio } from 'src/app/interface/estadio';
import { EstadioService } from 'src/app/services/login/estadios/estadio.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estadio',
  templateUrl: './estadio.component.html',
  styleUrls: ['./estadio.component.css']
})
export class EstadioComponent {
  estadios: Estadio[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: EstadioService
  ) {}

  ngOnInit(): void {
    this.service.getEstadios()
    .subscribe((data: any) => {
        this.estadios = data.data;
        console.log(this.estadios, 'estadio');
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
