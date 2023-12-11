import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  
  nombre_usuario: string = "";


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.nombre_usuario = this.activatedRoute.snapshot.paramMap.get('nombre') || "";
  }

  redirectLogin(){
    this.router.navigate(['/login'])
  }
}
