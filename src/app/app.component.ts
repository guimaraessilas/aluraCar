import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AgendamentosPage } from "../pages/agendamentos/agendamentos";
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) public nav: Nav;

  rootPage = HomePage;

  public paginas = [{titulo: 'Agendamentos', componente: AgendamentosPage}]
  
  constructor(platform: Platform) {
    platform.ready().then(() => {

      
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  abrePagina(pagina): void{
    this.nav.push(pagina.componente);
  }
}
