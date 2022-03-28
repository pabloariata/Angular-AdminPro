import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  public imgSubs!: Subscription;

  constructor(private usuarioSrv: UsuarioService, private busquedasSrv: BusquedasService, private modalImagenSrv: ModalImagenService) { }
 

  ngOnInit(): void {
    this.cargarUsuarios();

    // para actualizar la imagen apenas se suba una nueva
    this.imgSubs = this.modalImagenSrv.nuevaImagen
    .pipe(delay(500)).subscribe(img => this.cargarUsuarios());

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cambiarPagina(valor: number) {

    this.desde += valor;

    if (this.desde<0){
      this.desde = 0;
    } else if (this.desde>=this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioSrv.cargarUsuarios(this.desde)
    .subscribe(({usuarios, totalRegistros: totalUsuarios}) => {
      console.log(totalUsuarios);
      this.totalUsuarios = totalUsuarios;
     
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
     
        console.log(this.totalUsuarios);

        this.cargando = false;

    });
  }

  buscar(termino: string) {

    if (termino.length===0){
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasSrv.buscar('usuarios', termino)
      .subscribe((resp: any) => {
        console.log(resp);

        this.usuarios = resp;


      })

      return true;

  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioSrv.uid) {
      return Swal.fire('Error', 'No puedes borrarte a ti mismo', 'error');
    }
    
    Swal.fire({
      title: '¿Confirma que desea borrar este usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioSrv.eliminarUsuario(usuario)
          .subscribe(resp => {
            Swal.fire('Usuario borrado', `Se ha eliminado al usuario ${usuario.nombre}`, 'success');
            this.cargarUsuarios();
          });


        

      }
    })
    return;
  }

  cambiarRole(usuario: Usuario) {
    console.log(usuario);
    this.usuarioSrv.guardarUsuario(usuario)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImagenSrv.abrirModal('usuarios', usuario.uid!, usuario.img);
  }

}
