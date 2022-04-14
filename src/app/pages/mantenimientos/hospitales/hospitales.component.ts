import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs!: Subscription

  constructor(private hospitalSrv: HospitalService, private modalImagenSrv: ModalImagenService, private busquedasSrv: BusquedasService) { }

  ngOnInit(): void {

    this.cargarHospitales();

      // para actualizar la imagen apenas se suba una nueva
      this.imgSubs = this.modalImagenSrv.nuevaImagen
      .pipe(delay(500)).subscribe(img => this.cargarHospitales());

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    
    this.hospitalSrv.cargarHospitales().subscribe(hospitales => {
      console.log(hospitales);
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {

    this.hospitalSrv.actualizarHospital(hospital._id!, hospital.nombre).subscribe(resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success');
    });

  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalSrv.eliminarHospital(hospital._id!).subscribe(resp => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success');
    })
  }

  async abrirSweetAlert() {
    const  {value = ""} = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })
    
   if(value!.trim().length>0){
     this.hospitalSrv.crearHospital(value!).subscribe((resp: any) => {
       console.log(resp);
       this.hospitales.push(resp.hospital);
       Swal.fire('Creado', value, 'success');
     })
   }


  }

  abrirModal(hospital: Hospital) {
    this.modalImagenSrv.abrirModal('hospitales', hospital._id!, hospital.img);
  }

  buscar(termino: string) {

    if (termino.length===0){
      return this.cargarHospitales();
    }

    this.busquedasSrv.buscar('hospitales', termino)
      .subscribe((resp: any) => {
        console.log(resp);

        this.hospitales = resp;


      })

      return true;

  }

}
