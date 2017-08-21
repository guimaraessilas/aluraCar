import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Carro } from "../carro/carro";
import { Agendamento } from "../agendamento/agendamento";

@Injectable()
export class AgendamentoDAO{

    constructor(private _storage: Storage){

    }

    private _getKey(agendamento: Agendamento){
        return agendamento.email + agendamento.data.substr(0,10);
    }

    salvar(agendamento: Agendamento){
        let key = this._getKey(agendamento);
        return this._storage.set(key, agendamento)
    }

    agendamentoDuplicado(agendamento: Agendamento){
        let key = this._getKey(agendamento);
        return this._storage
                .get(key)
                .then(dado =>{
                    return dado ? true : false
                });
    }

    listarTodos(){
        let agendamentos: Agendamento[] = [];

        return this._storage.forEach(dado => {
            let carro = new Carro(dado.carro.nome, dado.carro.preco);
            let agendamento = new Agendamento(
                carro, dado.valor,
                dado.nome, dado.endereco,
                dado.email, dado.data,
                dado.confirmado
            );
            agendamentos.push(agendamento);
        })
        .then(() => agendamentos);
    }
}