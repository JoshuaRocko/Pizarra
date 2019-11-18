import React, { Component } from 'react';
import VentanaModal from './VentanaModal';
import Header from './Header';
import Tabla from './Tabla';
import { Redirect } from 'react-router-dom';

class Principal extends Component {
    constructor(props) {
        super(props);
        this.state = { mostrarModal: true };
    }

    render() {
        if (!sessionStorage.getItem('usuario')) {
            return (<Redirect to={'/'} />)
        } else {
            let cerrarModal = () => this.setState({ mostrarModal: false });
            let usr = sessionStorage.getItem('usuario');
            return (
                <div>
                    <VentanaModal show={this.state.mostrarModal} onHide={cerrarModal}
                        cuerpo={'A continuación se mostrará'
                            + ' una lista con tus pizarrones guardados.'} />
                    <Header />
                    <Tabla usr={usr} />
                </div>
            );
        }

    }
}
export default Principal;