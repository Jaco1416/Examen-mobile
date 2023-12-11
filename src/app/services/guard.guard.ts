import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//import { UsuStorageService } from './usu-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router: Router, private fireservice: FirebaseService){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //AQUI VA NUESTRA LÓGICA:
    var auth: any = this.fireservice.getAuth();

    if (!auth) {
      this.router.navigate(['/login']);
      return false;

    }else{
      return true;
    }

  }
  
}
