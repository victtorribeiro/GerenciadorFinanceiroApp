import React from 'react';
import Navbar from '../components/navbar';
import Rotas from './rotas';
import ProvedorAutenticacao from './provedorAutenticacao';

import 'toastr/build/toastr.min.js'


import 'bootswatch/dist/flatly/bootstrap.min.css'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.min.css'
import 'toastr/build/toastr.css'


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

class App extends React.Component {
  render(){
    return(
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />

        </div>
      </ProvedorAutenticacao>
      )
  };
}

export default App;
