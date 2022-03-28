import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'

// tipo de google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [localStorage.getItem('email')]
  });


  constructor(private router: Router, private fb: FormBuilder, private usuarioSrv: UsuarioService, private ngZone: NgZone) { }


  ngOnInit(): void {

    this.renderButton();

  }

  login() {
    
    this.usuarioSrv.login(this.loginForm.value)
      .subscribe(resp => {
        console.log(resp);

        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      })

  }
  // var id_token = googleUser.getAuthResponse().id_token;


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
     
    });

    this.startApp();

  }

  async startApp() {

      await this.usuarioSrv.googleInit();
      this.auth2 = this.usuarioSrv.auth2;

      this.attachSignin(document.getElementById('my-signin2'));
    
  };

  attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.usuarioSrv.loginGoogle(id_token).subscribe(resp => {
            // Usamos aca el ngZone, ya que el navigate del router de angular, lo llama luego que se resuelva una promesa de una libreria externa a angular. 
            // Con esto, dejamos que angular siga manejando el ciclo de vida
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            });


          });

        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}
