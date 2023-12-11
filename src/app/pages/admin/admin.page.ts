import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
//import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/comun/validaciones';
import { validateRut } from '@fdograph/rut-utilities';
import * as moment from 'moment';
//import { UsuStorageService } from 'src/app/services/usu-storage.service';
//import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {


  usuario = new FormGroup({
    //Datos del formulario - Validaciones
    rut: new FormControl('', [Validators.required,
    Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}-[0-9kK]{1}')]),

    p_nombre: new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)]),

    s_nombre: new FormControl('', [Validators.minLength(3),
    Validators.maxLength(50)]),

    ap_paterno: new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30)]),

    ap_materno: new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30)]),

    perfil: new FormControl(''),

    email: new FormControl('', [Validators.required,
    Validators.email,
    Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),

    fecha_nac: new FormControl('', [Validators.required]),

    pass_1: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).{6,12}$')]),

    pass_2: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).{6,12}$')]),

  }, {
    validators: CustomValidators.claveIgual('pass_1', 'pass_2'),
  });


  isAlertOpen = false;
  alertButtons = ['Action'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  

  usuarios: any[] = [];
  usu: any = undefined;
  KEY: string = 'usuarios';
  persona: any = {};

  v_agregar: boolean = false;

  boton_modificar: boolean = true;

  boton_registrar: boolean = false;

  boton_mod: boolean = false;

  id_modificar: any = '';

  constructor(private toastController: ToastController,
              //private usuStorage: UsuStorageService,
              // private activatedRoute: ActivatedRoute,
              private fireservice: FirebaseService) { }

  rut_admin: string = "";
  nombre_usuario: string = "";

  ngOnInit() {
    this.listar();
    console.log(this.usuario)
    this.listar();
  }  

  //registrar los usuarios
  registrar(){
    let fecha = this.usuario.value.fecha_nac || ""
    let fechaOk = moment(fecha, "YYYY-MM-DD").toDate();
    if(this.fireservice.validarEdad(fechaOk)){
      if(validateRut(this.usuario.value.rut||"") == false) {
        this.mostrarToast("middle", "Rut no valido!",3000);
      }else if(this.usuario.value.pass_1 != this.usuario.value.pass_2){
        this.mostrarToast("middle", "Las contraseñas no coinciden!",3000);
      }else {
        this.fireservice.agregar('usuarios', this.usuario.value);
        this.mostrarToast("middle", "Usuario registrado!", 3000);
        this.usuario.reset();       
      }
  }
    //this.listar();
  }

  //listar
  listar(){
    this.fireservice.getDatos('usuarios')?.subscribe(
      data => {
        this.usuarios = [];
        for(let usuario of data){
          console.log( usuario.payload.doc.data() );
          let usu: any = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push( usu );
        }
      }
    );
  }

  //modificar usuarios
  modificar(){
    console.log(this.id_modificar)
    this.persona = this.usuario
    this.fireservice.modificar('usuarios', this.id_modificar, this.usuario.value);
    this.mostrarToast('middle','Usuario modificado', 3000);
    this.usuario.reset();
    document.getElementById("rut")?.setAttribute("disabled", "false")
    this.boton_modificar = true;
    this.boton_registrar = false;
    this.listar();
    this.id_modificar = '';
  }

  public cancelar(){
    document.getElementById("rut")?.setAttribute("disabled", "false")
    this.boton_modificar = true;
    this.boton_registrar = false;
  }

  //eliminar usuarios
  eliminar(rut_eliminar: string, id: string){
    if (this.rut_admin == rut_eliminar) {
      this.mostrarToast('middle','Error! no te puedes eliminar a ti mismo', 3000);
    }else{
      this.fireservice.eliminar('usuarios', id);
      this.listar();
      this.mostrarToast('middle','Usuario eliminado con éxito', 3000);
    }

  }

  //limpiar datos
  async limpiar() {
    this.usuario.reset();
    this.boton_modificar = true;
    this.boton_registrar = false;
    document.getElementById("rut")?.setAttribute("disabled", "false");
  }

  //buscar usuarios
  buscar(id: string){
    this.fireservice.getDato('usuarios', id)?.subscribe(
      (response: any) => {
        //console.log( response.data() );
        var usuario_encontrado: any = response.data();
        this.id_modificar = response.id;
        this.usuario.setValue(usuario_encontrado);
      }
    );
    this.boton_modificar = false;
    this.boton_registrar = true;
    document.getElementById("rut")?.setAttribute("disabled", "true");
    console.log(this.id_modificar)
  }


  //Toast para mostrar ventanas emergentes
  async mostrarToast(position: 'top' | 'middle' | 'bottom',
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



