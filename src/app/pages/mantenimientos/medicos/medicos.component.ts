import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];
  private imgSubs!: Subscription

  constructor(private medicoSrv: MedicoService, private modalImagenSrv: ModalImagenService, private busquedasSrv: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenSrv.nuevaImagen
      .pipe(delay(500)).subscribe(img => this.cargarMedicos());

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.medicoSrv.cargarMedicos().subscribe(medicos => {
      this.cargando = false;
      this.medicos = medicos;

      console.log(this.medicos);

    })
  }

  abrirModal(medico: Medico) {

    this.modalImagenSrv.abrirModal('medicos', medico._id!, medico.img)

  }

  buscar(termino: string) {

    if (termino.length===0){
      return this.cargarMedicos();
    }

    this.busquedasSrv.buscar('medicos', termino)
      .subscribe((resp: any) => {
        console.log(resp);

        this.medicos = resp;


      })

      return true;

  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Confirma que desea borrar este usuario?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.medicoSrv.eliminarMedico(medico._id!)
          .subscribe(resp => {
            Swal.fire('Médico borrado', `Se ha eliminado al médico ${medico.nombre}`, 'success');
            this.cargarMedicos();
          });


        

      }
    })
    return;
  }

}
