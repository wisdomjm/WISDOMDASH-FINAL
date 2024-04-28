import { Component, OnInit } from '@angular/core';
import { AgregarCursosBDService } from 'src/app/services/agregar-cursos-bd.service';
import Cursos from 'src/data/Cursos';

@Component({
  selector: 'app-cursos-activos',
  templateUrl: './cursos-activos.component.html',
  styleUrls: ['./cursos-activos.component.scss'],
})
export class CursosActivosComponent  implements OnInit {

  cursos: Cursos[];

  constructor(private recibirDatos: AgregarCursosBDService) { }

  ngOnInit() {
    this.CargarCursosDisponibles();
  }

  public CargarCursosDisponibles(){
    //this.cursos = [];
    this.recibirDatos.obtenerCursoDelaBaseDeDatos().subscribe(cursos =>{
      console.log('CURSOS: ', cursos);
      this.cursos = cursos;
    })
  }

}
