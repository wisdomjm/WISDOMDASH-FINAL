import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from "@angular/router";
import { AgregarCursosBDService } from 'src/app/services/agregar-cursos-bd.service';

@Component({
  selector: 'app-editarcurso',
  templateUrl: './editarcurso.page.html',
  styleUrls: ['./editarcurso.page.scss'],
})
export class EditarcursoPage implements OnInit {

  idCurso: string;
  cursos:any = {
    id: '',
    nombreCurso: '',
    categoria: '',
    descripcionCorta: '',
    descripcionLarga: '',
    subclases: {},
    imagenCurso: '',
    precio:0
  };

  contenidoClases: any = [];
  numerodeclases: any;

  constructor(
    private route: ActivatedRoute,
    private recibirDatos: AgregarCursosBDService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idCurso = params.get('curso');
    });
    this.CargarDetalleDelCurso(this.idCurso);
  }

  CargarDetalleDelCurso(id:any){
    this.recibirDatos.obtenerCursoDelaBaseDeDatos().subscribe(resp =>{
      //console.log('CURSOS: ', resp);
      //this.cursos = [];
      
      resp.forEach(value =>{
        if(value.id == id){
          const valores: any = {
            id: value.id,
            nombreCurso: value.nombreCurso,
            categoria: value.categoria,
            descripcionCorta: value.descripcionCorta,
            descripcionLarga: value.descripcionLarga,
            subclases: value.subclases,
            imagenCurso: value.imagenCurso,
            precio: value.precio
          }
          this.cursos.id = valores.id;
          this.cursos.nombreCurso = valores.nombreCurso;
          this.cursos.categoria = valores.categoria;
          this.cursos.descripcionCorta = valores.descripcionCorta;
          this.cursos.descripcionLarga = valores.descripcionLarga;
          this.cursos.subclases = valores.subclases;
          this.contenidoClases = valores.subclases;
          this.numerodeclases = this.contenidoClases.length;
          this.cursos.imagenCurso = valores.imagenCurso;
          this.cursos.precio = valores.precio;
        }
      })
      
      //console.log("###############################################")
      console.log("Los datos que obtengo son: ",this.cursos);
    })
  }

  ActualizarCurso(){
    this.recibirDatos.actualizarCurso(this.idCurso,this.cursos).then(res =>{
      console.log("Se actualizo la informacion: ",res);
    }, error =>{
      console.log("Error: ",error);
    })
  }
}
