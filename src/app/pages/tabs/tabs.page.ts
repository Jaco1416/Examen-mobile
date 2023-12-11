import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { UsuStorageService } from 'src/app/services/usu-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  coleccion_usuarios: string = 'usuarios';
  usuarios: any [] = [];
  isAuntenticated = new BehaviorSubject(false);

  usuarioIngresado : any = {};
  rut_weon: any;
  perfil_weon: any;
  correoIniciado: any;


  constructor(private router: Router,
              private fireservice: FirebaseService,
              private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit() {
    this.cargarDatos();
    this.correoIniciado = this.router.getCurrentNavigation()?.extras.state;
    this.correoIniciado = this.correoIniciado.usuario
    console.log(this.correoIniciado);
    
  }

  async cargarDatos() {
    this.fireservice.getDatos(this.coleccion_usuarios)?.subscribe(
      data => {
        this.usuarios = [];
        for (let usuario of data) {
          console.log(usuario.payload.doc.data());
          let usu: any = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push(usu);
          //console.log(usu.perfil);
          if(usu.email == this.correoIniciado){
            this.perfil_weon = usu.perfil;
            //console.log(this.perfil_weon);
            break
          }
        }
      }
    );
  }

  buscar(id: any){
    this.fireservice.getDato(this.coleccion_usuarios, id)?.subscribe(
      (response: any) => {
        console.log( response.data() );
        //this.rut_weon = response.rut;
        //console.log(this.rut_weon)
      }
    );
  }


  async salir() {

    this.isAuntenticated.next(false);
    this.router.navigate(['/login']);
  }

}
