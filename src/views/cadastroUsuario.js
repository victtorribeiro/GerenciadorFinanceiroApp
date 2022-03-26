import React from "react";

import { withRouter } from 'react-router-dom'
import Card from "../components/card";
import FormGroup from "../components/form-group";

import UsuarioService from "../app/service/usuarioService";
import { mensagemSucesso, mensagemErro} from "../components/toastr/toastr";

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvar(usuario)
            .then( response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login');
    }



    render(){
        return (
                <Card title="Cadastro de Usuário">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label="Nome: *" htmlFor="imputNome">
                                    <input type="text"
                                        className="form-control"
                                        id="inputNome"
                                        nome="nome"
                                        onChange={ e => this.setState( { nome: e.target.value } ) }
                                    />

                                </FormGroup>
                                <FormGroup label="Email: *" htmlFor="imputEmail">
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        nome="email"
                                        onChange={ e => this.setState( { email: e.target.value } ) }
                                    />

                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="imputSenha">
                                    <input type="password"
                                        className="form-control"
                                        id="inputSenha"
                                        nome="senha"
                                        onChange={ e => this.setState( { senha: e.target.value } ) }
                                    />

                                </FormGroup>
                                <FormGroup label="Repita a Senha: *" htmlFor="imputRepitaSenha">
                                    <input type="password"
                                        className="form-control"
                                        id="imputRepitaSenha"
                                        nome="senha"
                                        onChange={ e => this.setState( { senhaRepeticao: e.target.value } ) }
                                    />

                                </FormGroup>
                                <br></br>
                                <button onClick={ this.cadastrar } type="button" className="btn btn-success">Salvar</button>
                                <button onClick={ this.cancelar } type="button" className="btn btn-danger">Cancelar</button>

                            </div>
                        </div>
                    </div>
                </Card>
        );
    }

}

export default CadastroUsuario;