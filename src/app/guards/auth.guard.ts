import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioSrv: UsuarioService, private router: Router) {}


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.usuarioSrv.validarToken()
    .pipe(
      tap(estaAutenticado => {
        if (!estaAutenticado){
          this.router.navigateByUrl('/login');
        }
      })
    );
    
  }

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
