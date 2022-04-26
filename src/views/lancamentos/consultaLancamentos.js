import React from "react";
import { withRouter } from 'react-router-dom'
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentosService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService"
import * as messages from "../../components/toastr/toastr";

class ConsultaLancamentos extends React.Component {


    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []

    }

    constructor(){
        super();
        this.service = new LancamentosService();
    }

    buscar = () => {

        if(!this.state.ano){
            messages.mensagemErro('O Preenchimento do campo Ano é obrigatório.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then( resposta => {
                this.setState({ lancamentos: resposta.data })
            }).catch( error => {
                console.log(error)
            })

    }

    editar = (id) => {
        console.log(id)
    }

    deletar = (id) => {
        console.log(id)
    }

    

    render(){

        const meses = [
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
        const tipos = [
            {label: 'Selecione ...', value:''},
            {label: 'DESPESA', value:'1'},
            {label: 'RECEITA', value:'2'},
        ]

        

        return(
            <Card title="Consulta de Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input id="inputAno"
                                       type="text"
                                       className="form-control" 
                                       value={this.state.ano}
                                       onChange={e => this.setState({ano: e.target.value})}
                                       placeholder="Digite o ano" >
                                </input>
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu id="inputMes"
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})} 
                                            className="form-control" 
                                            lista={meses} 
                                />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo: *">
                                <SelectMenu id="inputTipo" 
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value})}
                                            className="form-control" 
                                            lista={tipos} 
                                />
                            </FormGroup>
                            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input id="inputDescricao"
                                       type="text"
                                       className="form-control" 
                                       value={this.state.descricao}
                                       onChange={e => this.setState({descricao: e.target.value})}
                                       placeholder="Descrição" >
                                </input>
                            </FormGroup>

                            <br />
                            <button onClick={ this.buscar } type="button" className="btn btn-success">Buscar</button>
                            <button onClick={ this.cancelar } type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                               editAction={this.editar}
                                               deleteAction={this.deletar}
                                               
                                               />
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaLancamentos);