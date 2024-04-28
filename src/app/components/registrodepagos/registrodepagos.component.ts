import { Component, OnInit } from '@angular/core';
import { RegsitroDePagos } from 'src/data/RegistroDePagos';

@Component({
  selector: 'app-registrodepagos',
  templateUrl: './registrodepagos.component.html',
  styleUrls: ['./registrodepagos.component.scss'],
})
export class RegistrodepagosComponent  implements OnInit {

  pagosRegistrados: RegsitroDePagos[] = [
    { 
      id:'',
      nombre:'',
      imagenPerfil:'',
      montoPagado:0,
      fecha:''
    }
  ] 
    
  constructor() { }

  ngOnInit() {
    this.CargarListaDePagos();
  }

  public CargarListaDePagos(){
    this.pagosRegistrados = [
      { 
        id:'001',
        nombre:'Juana Maria',
        imagenPerfil:'../../../assets/profiles/profile1.jpg',
        montoPagado:3.15,
        fecha:'01-01-2024'
      },
      { 
        id:'002',
        nombre:'Carolina Sanchez',
        imagenPerfil:'../../../assets/profiles/profile2.jpg',
        montoPagado:95.99,
        fecha:'16-01-2024'
      },
      { 
        id:'003',
        nombre:'Isabel Perez',
        imagenPerfil:'../../../assets/profiles/profile3.jpg',
        montoPagado:25.99,
        fecha:'14-01-2024'
      },
      { 
        id:'004',
        nombre:'Daniela Donado',
        imagenPerfil:'../../../assets/profiles/profile4.jpg',
        montoPagado:32.25,
        fecha:'05-01-2024'
      },
    ]
  }
}
