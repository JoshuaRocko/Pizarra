import React, { Component } from 'react';
import Header from './componentes/Header';
import { ModalVentana } from './componentes/modal';
import Tabla from './componentes/Tabla';

class Main extends Component {
    constructor(props) { 
        super(props);
        this.state = {mostrarModal: true};
    }
    render() {
        let cerrarModal =() =>this.setState({mostrarModal:false});
        return (
            <div>
                <ModalVentana show={this.state.mostrarModal} onHide={cerrarModal} 
                    titulo={this.props.usr} cuerpo={'A continuación se mostrará'
                    + ' una lista con tus pizarrones guardados.'}/>
                <Header />
                <Tabla usr={this.props.usr}/>
            </div>
        );
    }
}
export default Main;