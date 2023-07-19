import { Component,OnInit } from '@angular/core';
import { Division } from 'src/app/interface/secure';
import { DivisionService } from 'src/app/services/Secure/division.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent {
  divisiones: Division[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: DivisionService
  ) {}

  ngOnInit(): void {
    this.service.getDivisiones()
    .subscribe((data: any) => {
        this.divisiones = data.data;
        console.log(this.divisiones, 'division');
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
