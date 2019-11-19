import React, { Component } from 'react';
import { Table, ButtonGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { withRouter, Redirect } from 'react-router-dom';

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.state = { ejercicios: [], redirect: false };
        this.logout = this.logout.bind(this);
    }

    logout() {
        sessionStorage.setItem('usuario', '');
        sessionStorage.clear();
        this.setState({ redirect: true });
    }

    componentDidMount() {
        fetch(
            'http://localhost:8080/pizarraBack/servletTablaArchivos?idUsr=' +
            this.props.usr
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ ejercicios: data });
                console.log(this.state.ejercicios);
            })
            .catch(console.log);
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
        if (this.state.ejercicios.length > 0) {
            const listar = this.state.ejercicios.map(ejercicio => {
                return (
                    <tr>
                        <td>Ejercicio {ejercicio}</td>
                        <td>
                            <div>
                                <ButtonGroup aria-label='Acciones'>
                                    <Button
                                        variant='outline-info'
                                        className='boton'
                                        size='sm'
                                    >
                                        Ver ejercicio
                                    </Button>
                                    <Button
                                        variant='outline-secondary'
                                        className='boton'
                                        size='sm'
                                    >
                                        Modificar ejercicio
                                    </Button>
                                    <Button
                                        variant='outline-dark'
                                        className='boton'
                                        size='sm'
                                    >
                                        Eliminar ejercicio
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </td>
                    </tr>
                );
            });
            return (
                <Container>
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

                    <Table responsive='md' striped bordered>
                        <thead>
                            <tr>
                                <th>Nombre ejercicio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>{listar}</tbody>
                    </Table>
                </Container>
            );
        } else {
            return <p className='text-center'>Cargando...</p>;
        }
    }
}
export default withRouter(Tabla);
