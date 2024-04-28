import { Injectable } from '@angular/core';
//Importamos la Libreria que nos permite almacenar documentos o cursos nuevos en la Base de Datos
import { Firestore, addDoc, collection, collectionData, doc, setDoc, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Cursos from 'src/data/Cursos';
import { User } from './user.service';
//import { DatosClases } from 'src/data/DatosClases';


@Injectable({
  providedIn: 'root'
})
export class AgregarCursosBDService {


  constructor(
    public firestore: Firestore
  ) { 


  }

  public agregarCurso(curso: Cursos){
    const datos = collection(this.firestore, 'RegCursos');
    return addDoc(datos, curso);
  }

  public actualizarCurso(cursoId: any, nuevosDatosCurso: Cursos){
    const datosCursoRef = doc(this.firestore, 'RegCursos', cursoId);
    return setDoc(datosCursoRef, nuevosDatosCurso, { merge: true });
  }


 public obtenerCursoDelaBaseDeDatos(): Observable<Cursos[]>{
  const datos = collection(this.firestore, 'RegCursos');
  return collectionData(datos,{ idField:'id' }) as Observable<Cursos[]>;
 }

 public obtenerListaDeUsuarios(): Observable<User[]>{
  const datos = collection(this.firestore,'users');
  return collectionData(datos,{ idField:'id' }) as Observable<User[]>;
 }


}
