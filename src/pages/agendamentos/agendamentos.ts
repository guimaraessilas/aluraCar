import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgendamentoDAO } from "../../domain/agendamento/agendamento-dao";
import { Agendamento } from "../../domain/agendamento/agendamento";

@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage {

  public agendamentos: Agendamento[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _agendamentoDAO: AgendamentoDAO) {

      this._agendamentoDAO
      .listarTodos()
      .then(agendamentos => this.agendamentos = agendamentos);
    }

}
