import React from 'react';
import Navbar from '../components/navbar';
import Rotas from './rotas';
import 'toastr/build/toastr.min.js'


import 'bootswatch/dist/flatly/bootstrap.min.css'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.min.css'
import 'toastr/build/toastr.css'

class App extends React.Component {
  render(){
    return(
      <>
        <Navbar />
        <div className="container">
          <Rotas />

        </div>
      </>
      )
  };
}

export default App;
