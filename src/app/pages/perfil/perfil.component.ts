import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {


  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any;

  constructor(private fb: FormBuilder, private usuarioSrv: UsuarioService, private fileUploadSrv: FileUploadService) {

    this.usuario = this.usuarioSrv.usuario;

   }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });

  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioSrv.actualizarPerfil(this.perfilForm.value)
      .subscribe(resp => {
        const {nombre, email} = this.perfilForm.value
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados',  'success');

      }, (err) => {
        console.log(err.error.msg);
        Swal.fire('Error', err.error.msg,  'error');
      });
  }

  cambiarImagen(event: any) {
    this.imagenSubir = event.target.files[0];

    if (!event.target.files[0]) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    return true;

  }

  subirImagen() {
    this.fileUploadSrv.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid || '').then((img) => {
      console.log(img);
      this.usuario.img = img;
      Swal.fire('Guardado', 'Imagen actualizada',  'success');

    }).catch(err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen',  'error');
    });
  }



}
