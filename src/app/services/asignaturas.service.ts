// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';


// @Injectable({
//   providedIn: 'root'
// })


// export class AsignaturasService {
//   asignaturas: any[] = [
//   ];


//   constructor(private storage: Storage) {
//     storage.create();
//   }

//   //Metodo buscar 
//   async buscar(codigo: string, key: string): Promise<any> {
//     this.asignaturas = await this.storage.get(key) || [];
//     return this.asignaturas.find(asignatura => asignatura.codigo == codigo);
//   }

//   //Metodo para listar
//   async listar(key: string): Promise<any[]> {
//     this.asignaturas = await this.storage.get(key) || [];
//     return this.asignaturas;
//   }


//   //Metodo para agregar  
//   async agregar(asignatura: any, key: string): Promise<boolean> {
//     this.asignaturas = await this.storage.get(key) || [];
//     let asigEncontrada = await this.buscar(asignatura.codigo, key);
//     if (asigEncontrada == undefined) {
//       this.asignaturas.push(asignatura);
//       await this.storage.set(key, this.asignaturas);
//       return true;
//     }
//     return false;
//   }


//   //Metodo para modificar 
//   async modificar(asignatura: any, key: string): Promise<boolean> {
//     this.asignaturas = await this.storage.get(key) || [];
//     let index = this.asignaturas.findIndex(asi => asi.codigo == asignatura.codigo);
//     if (index == -1) {
//       return false;
//     }
//     this.asignaturas[index] = asignatura;
//     await this.storage.set(key, this.asignaturas);
//     return true;
//   }


//   //Metodo para eliminar 
//   async eliminar(codigo: string, key: string): Promise<boolean> {
//     var resp: boolean = false;
//     this.asignaturas = await this.storage.get(key) || [];
//     this.asignaturas.forEach((asignatura, index) => {
//       if (asignatura.codigo == codigo) {
//         this.asignaturas.splice(index, 1);
//         resp = true;
//       }
//     });
//     await this.storage.set(key, this.asignaturas);
//     return resp;
//   }
// }