import React from "react";
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localStorageService";
import currencyFormatter from "currency-formatter";


class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.usuarioService = new UsuarioService();
    }

    componentDidMount(){
        
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
            .then(retorno => {
                this.setState({ saldo: retorno.data })
            }).catch(error => {
                console.error(error.retorno)
            });
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de { currencyFormatter.format(this.state.saldo, { locale: 'pt-BR'})}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" 
                        role="button"><i className="pi pi-users"></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos" 
                        role="button"><i className="pi pi-money-bill"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        );
    }
}

export default Home;