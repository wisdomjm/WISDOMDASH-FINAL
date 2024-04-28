import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AgregarCursosBDService } from 'src/app/services/agregar-cursos-bd.service';
import Cursos from 'src/data/Cursos';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})


export class DashboardPage implements OnInit {

  cursos:any []= [{
    id: '',
    nombreCurso: '',
    categoria: '',
    descripcionCorta: '',
    descripcionLarga: '',
    subclases: 0,
    imagenCurso: '',
    precio:0
  }];

  constructor(
    public AutenticationUser: AuthenticationService,
    private recibirDatos: AgregarCursosBDService
  ) { }

  ngOnInit() {
    this.CargarCursosDisponibles();
  }


  /* 
    Esta funcion carga la lista de cursos disponibles
  */
  CargarCursosDisponibles(){
    
    this.recibirDatos.obtenerCursoDelaBaseDeDatos().subscribe(resp =>{
      //console.log('CURSOS: ', resp);
      this.cursos = [];
      
      resp.forEach(value =>{
        const valores: any = {
          id: value.id,
          nombreCurso: value.nombreCurso,
          categoria: value.categoria,
          descripcionCorta: value.descripcionCorta,
          descripcionLarga: value.descripcionLarga,
          subClases: value.subclases,
          imagenCurso: value.imagenCurso,
          precio: value.precio
        }

        this.cursos.push(valores);
        //this.cursos = Array.of(valores);
      })
      
      //console.log("###############################################")
      //console.log("Los datos que obtengo son: ",this.cursos);
    })
  }


}
