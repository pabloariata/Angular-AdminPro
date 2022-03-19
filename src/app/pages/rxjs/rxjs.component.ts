import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs!: Subscription;

  constructor() { 



    // this.retornaObservable().pipe(

    //   retry(1) //El argumento del retry es la cantidad de veces que reintenta

    // ).subscribe( (valor) => {

    //   console.log('Subs:', valor);

    // }, (err) => {
    //   console.log('Error:', err);
    // }, () => {
    //   console.info('OBS Completado');
    // });

    this.intervalSubs = this.retornaIntervalo()
      .subscribe(
        // (valor) => console.log(valor)
        //**  Esto es lo mismo, que lo de arriba */
        console.log
      )

    
      
    
  }
  
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval(100)
    .pipe(
      // take(10), // take: operador que define cuantas iteraciones del observab le queremos
      map(valor => valor+1),
      filter(valor => valor%2==0), // Obtener solo los numeros pares
    );


  }

  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>( observer => {

      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        if (i===2) {
          observer.error('i llego al valor de 2');
        }

      }, 1000)

    });


  }

  ngOnInit(): void {
  }

}
