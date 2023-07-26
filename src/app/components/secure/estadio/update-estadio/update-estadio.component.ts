import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estadio } from 'src/app/interface/secure';
import { EstadioService } from 'src/app/services/Secure/estadio.service';

@Component({
  selector: 'app-update-estadio',
  templateUrl: './update-estadio.component.html',
  styleUrls: ['./update-estadio.component.css']
})
export class UpdateEstadioComponent implements OnInit {
  estadio: Estadio = { nombre: '', pais: '', capacidad: 0 };
  estadioId: number = 0;

  constructor(
    private estadioService: EstadioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.estadioId = parseInt(params.get('id') || '0', 10);
      this.cargarEstadio();
    });
  }

  cargarEstadio(): void {
    this.estadioService.getEstadio(this.estadioId).subscribe(
      (data: Estadio) => {
        this.estadio = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  guardarCambios(): void {
    this.estadioService.updateEstadio(this.estadioId, this.estadio).subscribe(
      (data: Estadio) => {
        console.log('Estadio actualizado correctamente', data);
        this.router.navigate(['/estadio']);
      },
      (error: any) => {
        console.error('Error al actualizar el estadio', error);
      }
    );
  }

  cancelar(): void {
    // Aquí puedes agregar lógica adicional si es necesario
    // Por ejemplo, redirigir al usuario a la página anterior
    this.router.navigate(['/estadio']);
  }
}
