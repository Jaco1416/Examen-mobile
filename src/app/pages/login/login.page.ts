import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
// import { UsuStorageService } from 'src/app/services/usu-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isCheck: boolean = false;

  correo: string = "";
  clave: string = "";
  KEY: string = "usuarios";
  isAuntenticated = new BehaviorSubject(false);

  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  coleccion_usuarios: string = 'usuarios';
  usuarios: any[] = [];

  constructor(private router: Router,
    //private usuarioService: UserService,
    private toastController: ToastController,
    // private usuStorage: UsuStorageService,
    private fireservice: FirebaseService) { }


  async ngOnInit() {
    this.fireservice.getDatos(this.coleccion_usuarios)?.subscribe(
      data => {
        this.usuarios = [];
        for (let usuario of data) {
          console.log(usuario.payload.doc.data());
          let usu: any = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push(usu);
        }
      }
    );
  }

  //redireccionar
  redirectRegistro() {
    this.router.navigate(['/registro'])
  }

  redirectRestablecer() {
    this.router.navigate(['/restablecer'])
  }

  ////////// para metodo de ingresar con firebase
  encontrarUsuario(correo: string, clave: string) {
    var usuarioLogin: any = this.usuarios.find(dato => dato.email == correo && dato.pass_1 == clave)
    return usuarioLogin;
  }

  //////login con firebase
  async ingresar(){
      this.isCheck = true;
      var correoValidar: any = this.usuario.controls.correo.value;
      var claveValidar: any = this.usuario.controls.clave.value;
  
      var usuarioLogin = this.encontrarUsuario(correoValidar, claveValidar);
      this.fireservice.validarLogin(usuarioLogin);

      if(usuarioLogin != undefined){
        //console.log(usuarioLogin)
        var navigationExtras: NavigationExtras = {
          state: {
            usuario: correoValidar
          }
        };
        if (usuarioLogin) {
          this.usuario.reset();
          this.router.navigate(['/tabs'], navigationExtras);
        }
      }else{
        this.usuario.reset();
        this.router.navigate(['/login']);
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


}
