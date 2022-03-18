import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// Declaramos la function aca para que Typescript no se queje, (la funcion esta a nivel global en el assets/js/custom.js)
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  constructor(private settingsSrv: SettingsService) { }

  ngOnInit(): void {
  
    customInitFunctions();

  }

}
