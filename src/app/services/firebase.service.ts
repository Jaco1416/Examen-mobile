import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  datos : any[] = [] ;
  isAuntenticated = new BehaviorSubject(false);
  constructor(private fire: AngularFirestore, private toastController: ToastController) { }

  async toastMensaje(message: string){
    const toast = await this.toastController.create({
      message,
      duration: 2000

    });
    toast.present();
  } 

  //crud:
  agregar(coleccion: string, value:any){
    try {
      this.fire.collection(coleccion).add(value);
      //this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log(error);
    }
  }

  getDatos(coleccion: string){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  eliminar(coleccion: string, id: string){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  getDato(coleccion: string, id: string){
    try {
      return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  modificar(coleccion: string, id: string, value: any){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }
  }   

  getAuth(){
    return this.isAuntenticated.value;
  }
  
  validarLogin(usuarioLogin: any){
    if(usuarioLogin != undefined){
      this.isAuntenticated.next(true);
    }else{
      this.vistaToast('middle','Usuario o contraseña incorrectos.', 3000)
    }
  }

  validarEdad(fechaNac: Date): boolean {
    let dateMin: Date = new Date("1958-12-31");
    let dateMax: Date = new Date("2006-12-31");
    if (fechaNac.getFullYear() >= dateMin.getFullYear() && fechaNac.getFullYear() <= dateMax.getFullYear()) {
      return true;
    } else {
      return false;
    }
  }

    //Toast para mostrar ventanas emergentes
    async vistaToast(position: 'top' | 'middle' | 'bottom',
    message: string,
    duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });

    await toast.present();
  }

  async logout() {
    this.isAuntenticated.next(false);
  }
}

