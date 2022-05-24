import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import cadastroLancamentos from "../views/lancamentos/cadastroLancamentos";

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}  />
                <Route path="/home" component={Home} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/cadastro-lancamentos/:id?" component={cadastroLancamentos} />
            </Switch>
        </HashRouter>
    )

}

export default Rotas;