import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from "@angular/router";
import { AgregarCursosBDService } from 'src/app/services/agregar-cursos-bd.service';

@Component({
  selector: 'app-informaciondelusuario',
  templateUrl: './informaciondelusuario.page.html',
  styleUrls: ['./informaciondelusuario.page.scss'],
})
export class InformaciondelusuarioPage implements OnInit {

  idUsuario: string;
  usuariosRegistrados: any = 
    {
    id:'',
    email:''
    }
  ;

  constructor(
    private route: ActivatedRoute,
    private recibirDatos: AgregarCursosBDService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idUsuario = params.get('idusuario');
      //console.log("EL ID DEL CURSO ES: ",this.idCurso);
    });
    this.CargarDatosDelUsuario(this.idUsuario);
  }

  public CargarDatosDelUsuario(_idusuario: any){
    this.recibirDatos.obtenerListaDeUsuarios().subscribe(resp =>{
      this.usuariosRegistrados = [];
      
      resp.forEach(value =>{
        if(value.uid == _idusuario){
          const valores: any = {
            id: value.uid,
            email: value.email
          }
          this.usuariosRegistrados.id = valores.id;
          this.usuariosRegistrados.email = valores.email;
        }
        //this.cursos = Array.of(valores);
      })
    })
  }

}
