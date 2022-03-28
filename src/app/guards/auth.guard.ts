import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioSrv: UsuarioService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      this.usuarioSrv.validarToken()
        .subscribe(resp => {

          console.log(resp);

      })

      console.log('paso por le canActivate del guard');

    return this.usuarioSrv.validarToken()
    .pipe(
      tap(estaAutenticado => {
        if (!estaAutenticado){
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  
}
