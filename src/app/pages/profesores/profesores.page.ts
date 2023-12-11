import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {

  nombre_usuario: string = "";

  numeroRandom : number = 0;
  min : number = 1;
  max : number = 9999;
  asistencia: string = "";

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.nombre_usuario = this.activatedRoute.snapshot.paramMap.get('nombre') || "";
    this.numRandom();
  }

  redirectLogin(){
    this.router.navigate(['/login'])
  }

  numRandom(){
    this.numeroRandom = Math.floor(Math.random()* (this.max-this.min+1)+this.min);
    this.asistencia = this.numeroRandom.toString();

  }
}
