import ApiService from '../apiService'

class LancamentosService extends ApiService {
    constructor(){
        super('/api/lancamentos')
    }

    consultar(lancamentoFiltro){
        let params = `/buscar?ano=${lancamentoFiltro.ano}`;

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }
        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }
        if(lancamentoFiltro.descricao){
            params = `${params}&usuario=${lancamentoFiltro.descricao}`
        }

        return this.get(params);
    }
}

export default LancamentosService;