import ApiService from '../apiService'
import ErroValidacao from '../exception/ErroValidacao';

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
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    obterListaTipos(){
        return [
            {label: 'Selecione ...', value:''},
            {label: 'DESPESA', value:'DESPESA'},
            {label: 'RECEITA', value:'RECEITA'},
        ]
    }
    obterListaMeses(){
        return [
            {label: 'Selecione ...', value:''},
            {label: 'Janeiro', value:'1'},
            {label: 'Fevereiro', value:'2'},
            {label: 'Março', value:'3'},
            {label: 'Abril', value:'4'},
            {label: 'Maio', value:'5'},
            {label: 'Junho', value:'6'},
            {label: 'Julho', value:'7'},
            {label: 'Agosto', value:'8'},
            {label: 'Setembro', value:'9'},
            {label: 'Outubro', value:'10'},
            {label: 'Novembro', value:'11'},
            {label: 'Dezembro', value:'12'},
        ]
    }

    salvar(lancamento){
        return this.post('/salvar', lancamento);
    }

    atualizar(lancamento){
        return this.put(`/atualizar/${lancamento.id}`, lancamento)
    }

    obterPorId(id){
        return this.get(`/buscar-id/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/atualizar-status/${id}`, { status })
    }


    validar(lancamento){
        const erros = [];

        if(!lancamento.ano) {
            erros.push("Informe o Ano.")
        }
        if(!lancamento.mes) {
            erros.push("Informe o Mês.")
        }
        if(!lancamento.descricao) {
            erros.push("Informe o Descrição.")
        }
        if(!lancamento.valor) {
            erros.push("Informe o Valor.")
        }
        if(!lancamento.tipo) {
            erros.push("Informe o Tipo.")
        }

        if(erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }
}

export default LancamentosService;