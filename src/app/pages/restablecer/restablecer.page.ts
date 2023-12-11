import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  correo_buscar: string = "";

  constructor(private usuarioService: UserService,
              private toastController: ToastController,
              private router: Router) { }

  ngOnInit() {
  }

  //buscar correo para reestablecer
  public buscarCorreo() {
    var lista_usu: any[] = this.usuarioService.listar();
    var usuario_encontrado = lista_usu.find(usu => usu.email == this.correo_buscar);
    console.log(lista_usu)
    console.log(usuario_encontrado)
    if (usuario_encontrado == undefined) {
      this.vistaToast("middle", "Este correo no se encuentra registrado!", 3500);
    }else{
      this.vistaToast("middle", "Mensaje de reestablecimiento de contraseña enviado.", 3500);
    }
  }

  redirectLogin() {
    this.router.navigate(['/login'])
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
