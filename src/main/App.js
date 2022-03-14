import React from 'react';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Rotas from './rotas';

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'

class App extends React.Component {
  render(){
    return(
      <div>
        <Rotas />

      </div>
      )
  };
}

export default App;
