import React from "react";
import AuthService from "../app/service/authService";
import ApiService from "../app/apiService";
import jwt from "jsonwebtoken";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;


class ProvedorAutenticacao extends React.Component{

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (tokenDTO) => {
        const token = tokenDTO.token;
        const claims = jwt.decode(token);
        console.log(claims);
        ApiService.registrarToken(token);
        AuthService.logar(tokenDTO);
        this.setState( { isAutenticado: true, usuarioAutenticado: tokenDTO } )
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState( { isAutenticado: false, usuarioAutenticado: null } )
    }

    render() {

        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        );
    }

}

export default ProvedorAutenticacao;