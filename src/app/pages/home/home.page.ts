import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//import { UsuStorageService } from 'src/app/services/usu-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import { ApiService } from 'src/app/services/api.service';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  idRandom: number = 0;
  chiste: string = "";
  chistes: any[] = [];
  remate: string = "";

  map: any;
  marker: any;


  constructor(//private usuStorage: UsuStorageService,
    //private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private fireservice: FirebaseService
  ) { }

  usuarios: any[] = [];
  KEY: string = "usuarios";
  rut_admin: string = "";
  nombre_usuario: string = "";
  nombre: any;


  async ngOnInit() {

    this.nombre = this.router.getCurrentNavigation()?.extras.state;

    this.listar();
    this.consumirApi();
    await this.cargarMapa();
  }


  consumirApi() {
    this.apiService.getDatos().subscribe((resp: any) => {
      this.chistes = resp;
      this.idRandom = Math.floor(Math.random() * this.chistes.length);
      this.chiste = this.chistes[this.idRandom].setup;
      this.remate = this.chistes[this.idRandom].punchline;

    });
  }

  listar() {
    this.fireservice.getDatos('usuarios')?.subscribe(
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

  async cargarMapa() {
    const mapa: any = document.getElementById("map");
    this.map = new google.maps.Map(mapa, {
      center: { lat: -33.598573168581254, lng: -70.57863380302126 },
      zoom: 18
    });

    this.marker = new google.maps.Marker({
      position: { lat: -33.598573168581254, lng: -70.57863380302126 },
      map: this.map,
      title: 'Ubicación inicial'
    });
  }



}
