import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any;

  constructor(public modalImagenSrv: ModalImagenService, private fileUploadSrv: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenSrv.cerrarModal();
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

    const id = this.modalImagenSrv.id;
    const tipo = this.modalImagenSrv.tipo;
    // const 

    this.fileUploadSrv.actualizarFoto(this.imagenSubir, tipo, id).then((img) => {
      console.log(img);
      Swal.fire('Guardado', 'Imagen actualizada',  'success');
      this.modalImagenSrv.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch(err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen',  'error');
    });
  }

}
