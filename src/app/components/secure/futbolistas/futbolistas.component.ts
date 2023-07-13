import { Component, OnInit } from '@angular/core';
import { Futbolista } from 'src/app/interface/futbolista';
import { FutbolistasService } from 'src/app/services/login/futbolistas/futbolista.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-futbolistas',
  templateUrl: './futbolistas.component.html',
  styleUrls: ['./futbolistas.component.css']
})
export class FutbolistasComponent implements OnInit {
  futbolistas: Futbolista[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private service: FutbolistasService
  ) {}

  ngOnInit(): void {
    this.service.getFutbolista()
    .subscribe((data: any) => {
        this.futbolistas = data.data;
        console.log(this.futbolistas, 'futbolista');
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
