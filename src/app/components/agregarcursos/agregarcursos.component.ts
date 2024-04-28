import { Component, OnInit } from '@angular/core';
import { AgregarCursosBDService } from 'src/app/services/agregar-cursos-bd.service';



@Component({
  selector: 'app-agregarcursos',
  templateUrl: './agregarcursos.component.html',
  styleUrls: ['./agregarcursos.component.scss'],
})
export class AgregarcursosComponent  implements OnInit {

  curso: any = {
    nombre: '',
    categoria: '',
    descripcionLarga: '',
    descripcionCorta: '',
    numeroSubClases: ''
  }
  

  
  constructor(
    public AgregarCursos: AgregarCursosBDService
  ) { }

  ngOnInit() {
    
  }

  public RegistrarNuevoCurso(nombre:any)
  {
    nombre = this.curso.nombre;
    console.log('se van a registrar los siguientes valores: ',this.curso.nombre);
  }

}
