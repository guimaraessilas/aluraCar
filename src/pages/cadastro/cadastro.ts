import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from "../../domain/carro/carro";
import { Http } from "@angular/http";
import { HomePage } from '../home/home';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from "../../domain/agendamento/agendamento-service";
import { AgendamentoDAO } from "../../domain/agendamento/agendamento-dao";


@Component({
  templateUrl: 'cadastro.html'
})

export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;
  public agendamento: Agendamento;
  private _alert: Alert; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _service: AgendamentoService,
    private _alertCtrl: AlertController) {

    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');
    
    this.agendamento = new Agendamento(this.carro, this.precoTotal);
    
    this._alert = this._alertCtrl.create({
      title: "Aviso",
      buttons: [{text: 'Ok', handler: () => this.navCtrl.setRoot(HomePage)}]
    });
  }

  agenda(){

    if(!this.agendamento.nome || !this.agendamento.email || !this.agendamento.endereco) {
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'OK'}]
      }).present();

      return ;
    }

    this._service
    .agenda(this.agendamento)
    .then(confirmado => {
      confirmado ?
      this._alert.setSubTitle("Agendamento realizado com sucesso"):
      this._alert.setSubTitle("Não foi possível realizar o agendamento. tente novamente mais tarde.");
      this._alert.present();
    })
    .catch(err => {
      this._alert.setSubTitle(err.message);
      this._alert.present();
    });
  }
}
