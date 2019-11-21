import React, { Component } from 'react';
import { Table, ButtonGroup, Button} from 'react-bootstrap';

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.state = { ejercicios: [], ejercicioBorrar: '' };
        this.handleBorrarEjercicio = this.handleBorrarEjercicio.bind(this);
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


    handleBorrarEjercicio(event) {
        event.preventDefault();
        let ejerc = event.target.name;
        let url = 'http://localhost:8080/pizarraBack/eliminarEjercicio?idUsr=' + this.props.usr + '&idArchivo=' + ejerc;
        fetch(url).then(response => response.text()).then(data => {
            if (data === 'eliminado') {
                alert('Se eliminó el ejercicio.');
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
            } else {
                alert('Houston, we have a problem.');
            }
        });

    }

    render() {
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
                                        name={"Ejercicio" + ejercicio}
                                        size='sm'
                                        href={'http://localhost:8080/pizarraBack/crearejercicio?idUsr=' +
                                            this.props.usr + "&idArchivo=" + ejercicio + '&ver=1'}
                                    >
                                        Ver ejercicio
                                    </Button>
                                    <Button
                                        variant='outline-secondary'
                                        className='boton'
                                        size='sm'
                                        href={'http://localhost:8080/pizarraBack/crearejercicio?idUsr=' +
                                            this.props.usr + "&idArchivo=" + ejercicio}
                                    >
                                        Modificar ejercicio
                                    </Button>
                                    <Button
                                        variant='outline-dark'
                                        className='boton'
                                        size='sm'
                                        name={ejercicio}
                                        onClick={this.handleBorrarEjercicio}
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
                <Table responsive='md' striped bordered>
                    <thead>
                        <tr>
                            <th>Nombre ejercicio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>{listar}</tbody>
                </Table>
            );
        } else {
            return <p className='text-center'>Cargando...</p>;
        }
    }
}
export default Tabla;
