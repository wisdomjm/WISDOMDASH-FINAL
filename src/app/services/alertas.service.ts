import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  alerta = inject(ToastController);
  //constructor() { }

  async Alerta(mensaje:any, duracion:any) {
    const toast = await this.alerta.create({
      message: mensaje,
      duration: duracion,
      position: 'bottom',
    });

    await toast.present();
  }
}
