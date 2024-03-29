import React from 'react'
import {withRouter} from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosService from '../../app/service/lancamentoService'
import * as messages from '../../components/toastr/toastr'

import LocalStorageService from '../../app/service/localStorageService'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: '',
        atualizando: false
        
    }

    constructor(){
        super();
        this.service = new LancamentosService();
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    submit = () => {
            
            const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

            const { descricao, valor, mes, ano, tipo } = this.state;
    
            const lancamento ={
                descricao,
                valor,
                mes,
                ano,
                tipo,
                usuario: usuarioLogado.id
            }

        try{
            this.service.validar(lancamento)

        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {

        const { descricao, valor, mes, ano, tipo, id, usuario, status } = this.state;

        const lancamento ={
            descricao,
            valor,
            mes,
            ano,
            tipo,
            id,
            usuario,
            status
        }
        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }


    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState( { ...response.data, atualizando: true } )
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        }
    }

    render(){

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();



        return(
            <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" 
                                   type="text" 
                                   className="form-control"
                                   name='descricao'
                                   value={this.state.descricao}
                                   onChange={this.handleChange}
                                   />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                                   type="text" 
                                   className="form-control"
                                   name='ano'
                                   value={this.state.ano}
                                   onChange={this.handleChange}
                                   />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" 
                                        lista={meses} 
                                        className="form-control"
                                        name='mes'
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" 
                                   type="text" 
                                   className="form-control"
                                   name='valor'
                                   value={this.state.valor}
                                   onChange={this.handleChange}
                                   />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                                        lista={tipos} 
                                        className="form-control"
                                        name='tipo'
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input id="inputStatus" 
                                   type="text" 
                                   className="form-control"
                                   disabled 
                                   name='status'
                                   value={this.state.status}
                                   />
                        </FormGroup>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        {
                            this.state.atualizando ? (
                                <button className="btn btn-success" onClick={this.atualizar} > <i className="pi pi-refresh" /> Atualizar </button>
                            ) : (
                                <button className="btn btn-success" onClick={this.submit} > <i className="pi pi-save" /> Salvar </button>
                            )
                        }
                        <button className="btn btn-danger" onClick={ e => this.props.history.push('/consulta-lancamentos') } > <i className="pi pi-times" /> Cancelar </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)