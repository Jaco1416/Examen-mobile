// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';
// import { Router } from '@angular/router';


// @Injectable({
//   providedIn: 'root'
// })
// export class UsuStorageService {

//   usuarios: any[] = [
//   ];

//   estado_login: boolean = false;


//   constructor(private storage: Storage,
//     private router: Router) {
//     storage.create();
//   }

  

//   async buscar(rut: string, key: string): Promise<any> {
//     this.usuarios = await this.storage.get(key) || [];
//     return this.usuarios.find(usuario => usuario.rut == rut);
//   }

//   async agregar(usuario: any, key: string): Promise<boolean> {
//     this.usuarios = await this.storage.get(key) || [];
//     let usuarioEncontrado = await this.buscar(usuario.rut, key);
//     if (usuarioEncontrado == undefined) {
//       this.usuarios.push(usuario);
//       await this.storage.set(key, this.usuarios);
//       return true;
//     }
//     return false;
//   }

//   async modificar(usuario: any, key: string): Promise<boolean> {
//     this.usuarios = await this.storage.get(key) || [];
//     let index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
//     if (index == -1) {
//       return false;
//     }
//     this.usuarios[index] = usuario;
//     await this.storage.set(key, this.usuarios);
//     return true;
//   }

//   async eliminar(rut: string, key: string): Promise<boolean> {
//     this.usuarios = await this.storage.get(key) || [];
//     this.usuarios.forEach((usuario, index) => {
//       if (usuario.rut == rut) {
//         this.usuarios.splice(index, 1);
//       }
//     });
//     await this.storage.set(key, this.usuarios);
//     return true;
//   }

//   async listar(key: string): Promise<any[]> {
//     this.usuarios = await this.storage.get(key) || [];
//     return this.usuarios;
//   }

//   validarEdad(fechaNac: Date): boolean {
//     let dateMin: Date = new Date("1958-12-31");
//     let dateMax: Date = new Date("2006-12-31");
//     if (fechaNac.getFullYear() >= dateMin.getFullYear() && fechaNac.getFullYear() <= dateMax.getFullYear()) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   async login(correo: string, clave: string, key: string): Promise<any> {
//     this.usuarios = await this.storage.get(key) || [];
//     this.estado_login = true;
//     return this.usuarios.find(usu => usu.email == correo && usu.pass_1 == clave);
//   }

//   logout() {
//     this.estado_login = false;
//     this.router.navigate(['/login']);
//   }

//   getEstadoLogin(): boolean {
//     return this.estado_login;
//   }
// }
