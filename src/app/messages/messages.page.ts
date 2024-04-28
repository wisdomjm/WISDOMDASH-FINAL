import { Component, OnInit } from '@angular/core';
import { AgregarCursosBDService } from 'src/app/services/agregar-cursos-bd.service';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  usuariosRegistrados: any[] = [
    {
    id:'',
    email:''
    }
  ];

  message : string = "";
  messages = [];
  rol: string;
  mensajealUsuario:any;

  constructor(private recibirDatos: AgregarCursosBDService, private realtimechat: AngularFireDatabase) { 
    this.rol = "admin"; //cliente - admin
  }

  ngOnInit() {
    this.CargarUsuarios();
  }

  public CargarUsuarios(){
    this.recibirDatos.obtenerListaDeUsuarios().subscribe(resp =>{
      this.usuariosRegistrados = [];
      
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

  public ObtenerMensajes(idUsuario:any){
    this.mensajealUsuario = idUsuario;
    console.log("Se cargaran los mensajes del usuario", this.mensajealUsuario);
    var messageRef = this.realtimechat.database.ref().child("WisdomChat").child('"'+idUsuario+'"');
    messageRef.on("value", (snap) =>{
      var data = snap.val();
      this.messages = [];
      for(var key in data)
      {
        this.messages.push(data[key]);
      }
    })
    
  }

  public sendMessajes(){
    var messageRef = this.realtimechat.database.ref().child("WisdomChat").child('"'+this.mensajealUsuario+'"');
    messageRef.push({mensaje: this.message, nombre: this.mensajealUsuario, rol: this.rol})
    this.message = "";
  }


}
