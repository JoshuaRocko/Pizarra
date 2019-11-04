import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './modal.css';

export class ModalVentana extends Component {
    render() {
        
        return (
            <Modal {...this.props} size="lg" aria-labelledby="miModal" centered>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title id="miModal">
                        <h3>¡Bienvenido, <small className="text-muted">{this.props.titulo}</small>!</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.cuerpo}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={this.props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

        );
    }
}