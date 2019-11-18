import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../css/modal.css';

class VentanaModal extends Component {
    render() {
        let cabecera;
        if (sessionStorage.getItem('usuario')) {
            cabecera = <h3>¡Bienvenido, <small className='text-muted'>{sessionStorage.getItem('usuario')}</small>!</h3>;
        } else {
            cabecera = <h4>Usuario y/o contraseña <small className='h4 text-white bg-dark'>incorrectos.</small></h4>;
        }
        return (<Modal {...this.props} size='lg' aria-labelledby='miModal' centered>
            <Modal.Header closeButton className='modal-header'>
                <Modal.Title id='miModal'>
                    {cabecera}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.cuerpo}</Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={this.props.onHide}>
                    Cerrar
                    </Button>
            </Modal.Footer>
        </Modal>);
    }
}
export default VentanaModal;