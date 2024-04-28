import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';


export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}


@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

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

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private toastController: ToastController,
    private storage: AngularFireStorage,
  ) { 
    this.isFileUploading = false;
    this.isFileUploaded = false;
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
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
        this.UploadedImageURL.subscribe(
          (resp) => {
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
      })
      .catch((err) => {
        console.log(err);
        this.MensajeDeVerificacion('Error al almacenar la imagen');
    });
  }

  async MensajeDeVerificacion(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'bottom',
    });

    await toast.present();
  }

  subirMultiplesVideo(files: File[], userIdentification: any, nombreProducto: any): Promise<string[]> {
    const filesArray = Array.from(files);

    const uploadTasks = filesArray.map(file => {
      const filePath = `carpeta-videos/${userIdentification}/${nombreProducto}/${file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = storageRef.put(file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(async () => {
            const downloadURL = await storageRef.getDownloadURL().toPromise();
            resolve(downloadURL);
          })
        ).subscribe();
      });
    });

    return Promise.all(uploadTasks);
  }


}
