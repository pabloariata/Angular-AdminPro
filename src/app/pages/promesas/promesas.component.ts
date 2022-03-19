import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [

  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise((resolve, reject) => {


    //   if (false){
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salio mal');
    //   }


    // });

    // promesa.then((mensaje) => {

    //   console.log(mensaje);

    // }).catch((error) => {

    //   console.log('Error en la promesa ' + error);

    // })



    // console.log('Fin del Init');

    // this.getUsuarios();

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });

  }

  getUsuarios() {
    return new Promise((resolve, reject) => {

      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(console.log(body.data)))


    });
    
  }


}
