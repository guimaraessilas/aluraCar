import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Agendamento } from "../../domain/agendamento/agendamento";

@Injectable()
export class AgendamentoDAO{

    constructor(private _storage: Storage){

    }

    salvar(agendamento: Agendamento){
        let key = this._getKey(agendamento);
        return this._storage.set(key, agendamento)
    }

    private _getKey(agendamento: Agendamento){
        return agendamento.email + agendamento.data.substr(0,10);
    }

    agendamentoDuplicado(agendamento: Agendamento){
        let key = this._getKey(agendamento);
        return this._storage
                .get(key)
                .then(dado =>{
                    return dado ? true : false
                });
    }
}