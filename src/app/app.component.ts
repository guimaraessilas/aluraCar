import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AgendamentosPage } from "../pages/agendamentos/agendamentos";
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from "../pages/perfil/perfil";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) public nav: Nav;

  rootPage = LoginPage;

  public paginas = [
    {titulo: 'Agendamentos', componente: AgendamentosPage},
    {titulo: 'Perfil', componente: PerfilPage}
  ]
  
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
