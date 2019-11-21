import React, { Component } from 'react';
import { Col, Row , Button} from 'react-bootstrap';
import { withRouter, Redirect } from 'react-router-dom';
class BtnPrincipales extends Component {
    constructor(props){
        super(props);
        this.state = {redirect: false};
        this.logout = this.logout.bind(this);
        this.handleCrearEjercicio = this.handleCrearEjercicio.bind(this);
    }

    logout() {
        sessionStorage.setItem('usuario', '');
        sessionStorage.clear();
        this.setState({ redirect: true });
    }

    handleCrearEjercicio = e => {
        window.location.href =
            'http://localhost:8080/pizarraBack/crearejercicio?idUsr=' +
            this.props.usr + "&idArchivo=nuevo";
    };

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/'} />)
        }

        return (
            <Row>
                <Col>
                    <Button
                        variant='dark'
                        onClick={this.handleCrearEjercicio}
                    >
                        Crear nuevo ejercicio.
                            </Button>
                </Col>
                <Col md={{ span: 3, offset: 3 }}>

                    <Button variant='dark' className='pull-right' onClick={this.logout}>
                        Cerrar sesión.
                            </Button>
                </Col>
            </Row>

        );
    }
}

export default withRouter(BtnPrincipales);