import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ToastController } from '@ionic/angular';
// import { UsuStorageService } from 'src/app/services/usu-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {


  usuarios: any[] = [];

  //Variables
  asignaturas: any[] = [];
  KEY: string = 'asignaturas';
  boton_modificar: boolean = true;
  boton_registrar: boolean = false;

  v_agregar : boolean = false;

  profesores: any[] =[];
  key_profes: string = 'usuarios';

  nom_profe: string = '';
  
  id_modificar : any = '';

  asig: any = {};

  asignatura = new FormGroup({
    codigo: new FormControl('', [Validators.required,
                                 Validators.minLength(1),
                                 Validators.maxLength(4)]),
    nombre: new FormControl('', [Validators.required,
                                 Validators.minLength(3),
                                 Validators.maxLength(50)]),
    profesor: new FormControl('',[Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(50)])
  });

  constructor(//private asignaturaService: AsignaturasService,
              private toastController: ToastController,
              // private usustorageservice: UsuStorageService,
              private fireservice: FirebaseService ){
                
    
  }

  async ngOnInit() {
    this.listar();
  } 

  listar(){
    //this.asignaturas = await this.asiStorage.listar(this.KEY);
    this.fireservice.getDatos('asignaturas')?.subscribe(
      data => {
        this.asignaturas = [];
        for(let asignatura of data){
          console.log( asignatura.payload.doc.data() );
          let asi: any = asignatura.payload.doc.data();
          asi['id'] = asignatura.payload.doc.id;
          this.asignaturas.push( asi );
        }
      }
    );
    this.fireservice.getDatos('usuarios')?.subscribe(
      dato => {
        this.usuarios = [];
        for(let usuario of dato){
          console.log( usuario.payload.doc.data() );
          let usu: any = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push( usu );
        }
      }
    );
  }

  //Metodo registrar
  registrar(){
    this.fireservice.agregar('asignaturas',this.asignatura.value);
      this.mostrarToast("middle","Asignatura guardada con exito!",3000);
      this.asignatura.reset();
      console.log(this.asignaturas);
  }

  //Metdodo buscar
  async buscar(id : string){
    this.fireservice.getDato('asignaturas', id)?.subscribe(
      (response: any) => {
        var asignatura_encontrada: any = response.data();
        this.id_modificar = response.id;
        this.asignatura.setValue(asignatura_encontrada);
      }
    );
    this.boton_modificar = false;
    this.boton_registrar = true;
    document.getElementById("codigo")?.setAttribute("disabled", "true");
  }

  //Metodo modificar
  modificar(){
    console.log(this.id_modificar)
    this.asig = this.asignatura
    this.fireservice.modificar('asignaturas', this.id_modificar, this.asignatura.value);
    this.mostrarToast('middle','Asignatura modificado', 3000);
    this.asignatura.reset();
    document.getElementById("codigo")?.setAttribute("disabled", "false")
    this.boton_modificar = true;
    this.boton_registrar = false;
    this.listar();
    this.id_modificar = '';
  }

  //Metodo cancelar
  public limpiar() {
    document.getElementById("codigo")?.setAttribute("disabled", "false")
    this.boton_modificar = true;
    this.boton_registrar = false;
  }

  //Metodo eliminar
  eliminar(id : string){
    //await this.asiStorage.eliminar(codigoEliminar, this.KEY);
    this.fireservice.eliminar('asignaturas', id);
    this.listar();
    this.mostrarToast("middle","Asignatura eliminada con exito!",3000);
  }

  //Alertas
  async mostrarToast(position: 'top' | 'middle' | 'bottom', message: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });

    await toast.present();
  }

}
