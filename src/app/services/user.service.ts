import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //lista de los usuarios
  usuarios: any[] = [];

  constructor(private toastController: ToastController) { }

  //crud para los usuarios

  //agregar usuario buscando que el rut no exista en la base
  agregar(usuario: any): boolean{
    if(this.buscar(usuario.rut) == undefined ){
      this.usuarios.push(usuario);
      console.log(this.usuarios);
      return true;
    }else {
      this.vistaToast("middle", "Rut ya existente en la base de datos!",3000);
    }
    return false;

  }
  //validar edad
  validarEdad(fechaNac: Date): boolean{
    let dateMin: Date = new Date("1958-12-31");
    let dateMax: Date = new Date("2006-12-31");
    if(fechaNac.getFullYear() >= dateMin.getFullYear() && fechaNac.getFullYear() <= dateMax.getFullYear()){
      return true;
    }else{
      return false;
    }
  }
  //Eliminar usuario buscando su rut en la base
  eliminar(rut: string){
    this.usuarios.forEach( (usu,index) => {
      if(usu.rut == rut){
        this.usuarios.splice(index,1);
      }
    });
  }

  //listar los usuarios y sus datos
  listar(){
    return this.usuarios;
  }

  //buscar usuario con su rut 
  buscar(rut: string){
    return this.usuarios.find( usu => usu.rut == rut );
  }

  buscarCorreo(correo: string){
    return this.usuarios.find( usu => usu.email == correo );
  }

  //modificar usuarios 
  modificar(rut: string, usuario: any){
    var posicion = this.usuarios.findIndex( usu => usu.rut == rut );
    this.usuarios[posicion] = usuario;
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
}
