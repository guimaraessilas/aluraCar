import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { Agendamento } from "../../domain/agendamento/agendamento";
import { Storage } from "@ionic/storage";
import { AgendamentoDAO } from "../../domain/agendamento/agendamento-dao";


@Injectable()
export class AgendamentoService{
    

    constructor(private _http: Http, private _dao: AgendamentoDAO){}
    
    agenda(agendamento: Agendamento){

        let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;

        return this._dao
        .agendamentoDuplicado(agendamento)
        .then(duplicado => {
            if(duplicado) throw new Error ('Este agendamento já foi realizado. Verifique!');
            return this._http
                        .get(api)
                        .toPromise()
                        .then(() => agendamento.confirmado = true, err => console.log(err))
                        .then(() => this._dao.salvar(agendamento))
                        .then(() => agendamento.confirmado);

        }) 
        
        
        
    }
}