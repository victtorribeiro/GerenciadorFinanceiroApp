import React from "react";
import { withRouter } from 'react-router-dom'
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentosService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService"
import * as messages from "../../components/toastr/toastr";

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component {


    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
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
                const lista = resposta.data;
                if(lista.length < 1) {
                    messages.mensagemAlert("Nenhum resultado encontrado.")
                }
                this.setState({ lancamentos: resposta.data })
                
            }).catch( error => {
                console.log(error)
            })

    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos =this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1)
                this.setState(lancamentos)
                this.setState({lancamentos: lancamentos, showConfirmDialog: false})
                messages.mensagemSucesso('Lançamento deletado com sucesso!')
            })
            .catch(error => {
                messages.mensagemErro('Ocorreu um erro ao deletar o lançamento')
            })
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog : true, lancamentoDeletar: lancamento})
    }
    
    cancelarDelecao = () => {
        this.setState({showConfirmDialog : false, lancamentoDeletar: {}})
    }

    preparaformulariocadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
    }
    
    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos;

                const index = lancamentos.indexOf(lancamento)

                if (index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState( { lancamento } );
                }
                messages.mensagemSucesso("Status atualizado com sucesso!")
            })
    }

    render(){

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );
        

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
                            <button onClick={ this.buscar } type="button" className="btn btn-success"> <i className="pi pi-search" /> Buscar</button>
                            <button onClick={ this.preparaformulariocadastro } type="button" className="btn btn-danger"> <i className="pi pi-plus" /> Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              editAction={this.editar}
                                              deleteAction={this.abrirConfirmacao}
                                              alterarStatus={this.alterarStatus}
                                               
                                               />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Deletar"
                            visible={this.state.showConfirmDialog} 
                            style={{ width: '50vw' }} 
                            footer={confirmDialogFooter}
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}
                            >
                            <p>
                                Tem certeza que quer apagar este lançamento?
                            </p>
                    </Dialog>

                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaLancamentos);