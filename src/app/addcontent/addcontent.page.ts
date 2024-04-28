import { Component, OnInit } from '@angular/core';
import Cursos from 'src/data/Cursos';
import { AgregarCursosBDService } from '../services/agregar-cursos-bd.service';
import { UploadfileService } from '../services/uploadfile.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}




@Component({
  selector: 'app-addcontent',
  templateUrl: './addcontent.page.html',
  styleUrls: ['./addcontent.page.scss'],
})
export class AddcontentPage implements OnInit {

  curso: any = {
    nombreCurso: '',
    categoria: '',
    descripcionLarga: '',
    descripcionCorta: '',
    subclases: {},
    imagenCurso: '',
    precio:''
  }

  subClasesDelCurso: any = {
    nombreDeSubclase: '',
    descripcionDeSubclase: '',
    videoDeSubclase:''
  };

  subclases: any = [];



  auxImagenCurso: any;
  // File upload task
  fileUploadTask: AngularFireUploadTask;
  // Upload progress
  percentageVal: Observable<any>;
  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;
  // Uploaded File URL
  UploadedImageURL: Observable<string>;
  // Uploaded image collection
  files: Observable<imgFile[]>;
  // Image specifications
  imgName: string;
  imgSize: number;
  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;
  private filesCollection: AngularFirestoreCollection<imgFile>;

  filestoragepath: any;

  //variables para el video
  videoPrevio: any;
  videoSeleccionado: File[] = [];


  constructor(
    private nuevoCurso: AgregarCursosBDService,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private subirmultiplesarchivos: UploadfileService,
  ) {

    this.isFileUploading = false;
    this.isFileUploaded = false;
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
  }

  ngOnInit() {
    if (this.auxImagenCurso == null) {
      this.auxImagenCurso = '../../assets/icons/wisdomlogo.jpg';
    }
  }

  async RegistrarNuevoCurso(
    nombre: any,
    categoria: any,
    descripcionLarga: any,
    descripcionCorta: any,
    imagenCurso: any,
    precio:any) {
    this.curso.subclases = this.subclases;
    const respuesta = await this.nuevoCurso.agregarCurso(this.curso);
    console.log('RESPUESTA DE FIREBASE: ', respuesta);
    this.limpiarCamposCursos();

  }

  async AgregarSubClases(_nombreDeSubclase:any, _descripcionDeSubclase:any, _videoDeSubclase:any){

    const datos = await this.subclases.push({
      nombreDeSubclase : _nombreDeSubclase,
      descripcionDeSubclase: _descripcionDeSubclase,
      videoDeSubclase: _videoDeSubclase
    })

    this.limpiarCamposSubClases();
    return console.log("LOS DATOS AGREGADOS SON: ",this.subclases);
  }

  uploadImage(event: FileList) {
    const file: any = event.item(0);
    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }
    this.isFileUploading = true;
    this.isFileUploaded = false;
    this.imgName = file.name;
    // Storage path
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    this.filestoragepath = fileStoragePath;
    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);
    // File upload task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
    // Show uploading progress
    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      finalize(() => {
        // Retreive uploaded image storage path
        this.UploadedImageURL = imageRef.getDownloadURL();
        //
        this.UploadedImageURL.subscribe(
          (resp) => {

            console.log('RESPUESTA DEL SERVIDOR AL ENVIAR LA IMAGEN: ', resp);

            this.auxImagenCurso = resp;
            this.curso.imagenCurso = this.auxImagenCurso;

            this.storeFilesFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize,
            });
            this.isFileUploading = false;
            this.isFileUploaded = true;

          },
          (error) => {
            console.log(error);
          }
        );
      }),
      tap((snap: any) => {
        this.imgSize = snap.totalBytes;
      })
    );
  }


  storeFilesFirebase(image: imgFile) {
    const fileId = this.afs.createId();
    this.filesCollection
      .doc(fileId)
      .set(image)
      .then((res) => {
        console.log(res);
        this.MensajeDeVerificacion('Se almaceno la imagen');
        //this.getUrl();
        this.isFileUploading = false;
        this.isFileUploaded = false;
      })
      .catch((err) => {
        console.log(err);
        this.MensajeDeVerificacion('Error al almacenar la imagen');
      });
  }

  public async getUrl() {
    this.afStorage.ref(this.filestoragepath)
      .getDownloadURL()               // it returns url value as observable
      .subscribe((url: string) => {
        // actions with url value
        console.log("SE OBTUVO EL ENLACE DE LA IMAGEN::: ", url);
      })
  }

  async MensajeDeVerificacion(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'bottom',
    });

    await toast.present();
  }

  limpiarCamposSubClases(){
    this.subClasesDelCurso.nombreDeSubclase = '';
    this.subClasesDelCurso.descripcionDeSubclase = '';
    this.subClasesDelCurso.videoDeSubclase = '';
  }

  limpiarCamposCursos(){  
    this.curso.nombreCurso = '';
    this.curso.categoria = '';
    this.curso.descripcionLarga = '';
    this.curso.descripcionCorta = '';
    this.curso.numeroSubClases = '';
    this.curso.imagenCurso = '';
    this.curso.precio = '';   
  }


  //funciones para el video
  seleccionarVideo(event: any) {
    this.videoSeleccionado = event.target.files;
    
    if (!this.videoSeleccionado) {
      this.MensajeDeVerificacion("No se selecciono ningun video.");
      return;
    }
  }


  async subirVideo() {
    if (this.videoSeleccionado.length > 0) {
      this.videoPrevio = "";
      this.MostrarLoading();
      const urls = await this.subirmultiplesarchivos.subirMultiplesVideo(this.videoSeleccionado, "CURSO"+this.curso.nombreCurso, this.curso.nombreCurso)
        .then(res =>{
          console.log('URLs de descarga:', res);
          //this.videoDelProducto = res;
          //this.producto.video = this.videoDelProducto;
          this.videoPrevio = res;
          this.subClasesDelCurso.videoDeSubclase =  this.videoPrevio;
        }, err => {
          //this.baseproductos.MensajeDeVerificacion("Error al enviar el video del Producto.");
        }).finally( () =>{
          this.loadingCtrl.dismiss();
        })

    } else {
      //this.baseproductos.MensajeDeVerificacion("No se seleccionaron el video del Producto.");
      //this.loadingCtrl.dismiss();
      console.log('No se seleccionaron archivos.');
    }
  }

  async MostrarLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      cssClass: 'custom-loading',
      spinner: 'bubbles' 

    });

    loading.present();
  }


}
