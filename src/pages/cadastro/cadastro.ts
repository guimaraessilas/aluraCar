import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from "../../domain/carro/carro";
import { Http } from "@angular/http";

@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;
  public nome: string;
  public endereco: string;
  public email: string;
  public data: string = new Date().toISOString();
  private _alert: Alert; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController) {

    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');
  
    this._alert = this._alertCtrl.create({
      title: "Aviso",
      buttons: [{text: 'Ok'}]
    });
  }

  agenda(){
    let api = `http://aluracar.herokuapp.com/salvarpedido?carro=${this.carro.nome}&preco=${this.precoTotal}&nome=${this.nome}&endereco=${this.endereco}&email=${this.email}&dataAgendamento=${this.data}`;
    this._http.get(api)
    .toPromise()
    .then(() => {
      this._alert.setSubTitle("Agendamento realizado com sucesso");
      this._alert.present();
    } )
    .catch(err => console.log(err));
      this._alert.setSubTitle("Não foi possível realizar o agendamento. tente novamente mais tarde.");
      this._alert.present();
    }
}
