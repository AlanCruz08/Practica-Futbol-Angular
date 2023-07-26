import { Component } from '@angular/core';
import { Division } from 'src/app/interface/secure';
import { DivisionService } from 'src/app/services/Secure/division.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-division',
  templateUrl: './update-division.component.html',
  styleUrls: ['./update-division.component.css']
})
export class UpdateDivisionComponent {
  division: Division = { nivel: 0, liga: '' };
  divisionId: number = 0;

  constructor(
    private divisionService: DivisionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.divisionId = parseInt(params.get('id') || '0', 10);
      this.cargarDivision();
    });
  }

  cargarDivision(): void {
    this.divisionService.getDivision(this.divisionId).subscribe(
      (data: Division) => {
        this.division = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  guardarCambios(): void {
    this.divisionService.updateDivision(this.divisionId, this.division).subscribe(
      (data: Division) => {
        console.log('División actualizada correctamente', data);
        this.router.navigate(['/division']);
      },
      (error: any) => {
        console.error('Error al actualizar la división', error);
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/division']);
  }
}
