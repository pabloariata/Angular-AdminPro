import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  

  data1 = {
    labels: [ 'Mayorista', 'En Tienda', 'Online' ],
    datasets: [
      { data: [ 350, 450, 100 ],
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
      },
    ]
  };
  data2 = {
    labels: [ 'Contado', 'Cheque', 'Cuenta Corriente' ],
    datasets: [
      { data: [ 60, 180, 10 ],
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
      },
    ]
  };
 

}
