import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EscolhaPage } from "../pages/escolha/escolha";
import { CadastroPage } from "../pages/cadastro/cadastro";
import { AgendamentoService } from "../domain/agendamento/agendamento-service";
import { Storage } from "@ionic/storage";
import { AgendamentoDAO } from '../domain/agendamento/agendamento-dao';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

function provideStorage(){
  return new Storage(['indexeddb'],
  {
    name: 'aluracar',
    storeName: 'agendamentos'
  });
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    AgendamentoService,
    {provide: Storage, useFactory: provideStorage},
    AgendamentoDAO
  ]
})
export class AppModule {}