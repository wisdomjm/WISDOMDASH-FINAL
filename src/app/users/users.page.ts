import { Component, OnInit } from '@angular/core';
//import  { Usuarios }  from '../../data/Usuario';
import { AgregarCursosBDService } from 'src/app/services/agregar-cursos-bd.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {


  usuariosRegistrados: any[] = [
    {
    id:'',
    email:''
    }
  ];

  constructor(private recibirDatos: AgregarCursosBDService) { }

  ngOnInit() {
    this.CargarUsuarios();
  }

  public CargarUsuariosRegistrados(){
    this.usuariosRegistrados = [
      {
        id:'1',
        imagenPerfil:'../../assets/profiles/profile3.jpg',
        nombres:'Helena',
        apellidos:'Gozales',
        email:'elena@email.com',
      },
      {
        id:'2',
        imagenPerfil:'../../assets/profiles/profile1.jpg',
        nombres:'Ana Maria',
        apellidos:'Jimenez',
        email:'jimenezana@email.com',
      },
      {
        id:'',
        imagenPerfil:'../../assets/profiles/profile4.jpg',
        nombres:'Geraldine',
        apellidos:'Montenegro',
        email:'gera12@email.com',
      },
    ]
  }

  public CargarUsuarios(){
    this.recibirDatos.obtenerListaDeUsuarios().subscribe(resp =>{
      //this.usuariosRegistrados = [];
      
      resp.forEach(value =>{
        const valores: any = {
          id: value.uid,
          email: value.email
        }

        this.usuariosRegistrados.push(valores);
        //this.cursos = Array.of(valores);
      })
    })
  }


}
