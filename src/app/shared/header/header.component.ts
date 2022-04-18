import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario!: Usuario;

  constructor(private usuarioSrv: UsuarioService, private router: Router) { 
    this.usuario = usuarioSrv.usuario;
  }

  ngOnInit(): void {
  }

  logOut() {
    this.usuarioSrv.logout();
  }

  buscar(termino: string) {
    if (termino.length===0){
      this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
