import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/interface/secure';
import { EquipoService } from 'src/app/services/Secure/equipo.service';


@Component({
  selector: 'app-update-equipo',
  templateUrl: './update-equipo.component.html',
  styleUrls: ['./update-equipo.component.css']
})
export class UpdateEquipoComponent  {
  equipo: Equipo = { nombre: '', dir_deportivo: '', estadio_id: 0 };
  //variable para almacenar el id del equipo
  equipoId: number = 0;

  constructor(
    private equipoService: EquipoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.equipoId = parseInt(params.get('id') || '0', 10);
      this.cargarEquipo();
    });
  }

  cargarEquipo(): void {
    this.equipoService.getEquipo(this.equipoId).subscribe(
      (data: Equipo) => {
        this.equipo = data;
      },
      

      (error: any) => {
        console.error(error);
      }
    );
  }

  guardarCambios(): void {
    this.equipoService.updateEquipo(this.equipoId, this.equipo).subscribe(
      (data: Equipo) => {
        console.log('Equipo actualizado correctamente', data);
        this.router.navigate(['/equipos']);
      },
      (error: any) => {
        console.error('Error al actualizar el equipo', error);
      }
    );
  }

  cancelar(): void {
    // Aquí puedes agregar lógica adicional si es necesario
    // Por ejemplo, redirigir al usuario a la página anterior
    this.router.navigate(['/equipos']);
  }
}
