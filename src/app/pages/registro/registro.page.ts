import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/comun/validaciones';
import { validateRut } from '@fdograph/rut-utilities';
import { Router } from '@angular/router';
import * as moment from 'moment';
//import { UsuStorageService } from 'src/app/services/usu-storage.service';
//firebase
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

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
    Validators.pattern('[a-zA-Z0-9._]{1,}@duocuc.cl'),
    ]),

    fecha_nac: new FormControl('', [Validators.required]),

    pass_1: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).{6,12}$')]),

    pass_2: new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).{6,12}$')]),

  }, {
    validators: [
      CustomValidators.claveIgual('pass_1', 'pass_2')
    ]
  });

  usuarios: any[] = [];
  KEY: string = 'usuarios';

  boton_modificar: boolean = true;
  boton_registrar: boolean = false;

  v_agregar: boolean = false;
  

  constructor(private usuarioService: UserService,
    private toastController: ToastController,
    private router: Router,
    //private usuStorage: UsuStorageService,
    private fireservice: FirebaseService) { }

  async ngOnInit() {
    await this.listar();
  }

  //redireccion
  redirectLogin() {
    this.router.navigate(['/login'])
  }

  registrar(){
    let fecha = this.usuario.value.fecha_nac || ""
    let fechaOk = moment(fecha, "YYYY-MM-DD").toDate();
    if(this.fireservice.validarEdad(fechaOk)){
      if(validateRut(this.usuario.value.rut||"") == false) {
        this.vistaToast("middle", "Rut no valido!",3000);
      }else if(this.usuario.value.pass_1 != this.usuario.value.pass_2){
        this.vistaToast("middle", "Las contraseñas no coinciden!",3000);
      }else {
        this.fireservice.agregar('usuarios', this.usuario.value);
        this.vistaToast("middle", "Usuario registrado!", 3000);
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

  //limpiar datos
  async limpiar() {
    this.usuario.reset();
    this.boton_modificar = true;
    this.boton_registrar = false;
    document.getElementById("rut")?.setAttribute("disabled", "false");
  }




  //Toast para mostrar ventanas emergentes
  async vistaToast(position: 'top' | 'middle' | 'bottom', message: string, duration: number) { 
  const toast = await this.toastController.create({ message, duration, position, }); 
  await toast.present(); 
  }
}
