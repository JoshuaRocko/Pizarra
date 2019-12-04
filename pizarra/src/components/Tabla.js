import React, { Component } from 'react';
import { Table, ButtonGroup, Button } from 'react-bootstrap';

class Tabla extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, isLoaded: false, ejercicios: [], ejercicioBorrar: '' };
    this.handleBorrarEjercicio = this.handleBorrarEjercicio.bind(this);
    this.handleCopiarEjercicio = this.handleCopiarEjercicio.bind(this);
  }

  componentDidMount() {
    fetch(
      'http://localhost:8080/pizarraBack/servletTablaArchivos?idUsr=' +
      this.props.usr
    )
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({ isLoaded: true, ejercicios: data });
          console.log(this.state.ejercicios);
        },
        (error) => {
          this.setState({ isLoaded: true, error });
        });
  }

  handleCopiarEjercicio(ejercicio, nombre){
    let nuevoNombre = window.prompt("Teclea el nuevo nombre");
    if(nuevoNombre ==null || nuevoNombre === ""){
      alert("Nombre inválido.");
    } else{
        let url =
        'http://localhost:8080/pizarraBack/copiarEjercicio?idUsr=' +
        this.props.usr +
        '&idArchivo=' +
        ejercicio + '&nombre=' + nombre + '&nuevoNombre=' + nuevoNombre;
        fetch(url)
        .then(response => response.text())
        .then(data => {
          if (data === 'copiado') {
            alert('Se copió el ejercicio.');
            fetch(
              'http://localhost:8080/pizarraBack/servletTablaArchivos?idUsr=' +
              this.props.usr
            )
              .then(res => res.json())
              .then(
                (data) => {
                  this.setState({ isLoaded: true, ejercicios: data });
                  console.log(this.state.ejercicios);
                },
                (error) => {
                  this.setState({ isLoaded: true, error });
                });
          } else {
            alert('Houston, we have a problem.');
          }
        });
    }
  }

  handleBorrarEjercicio(ejercicio, nombre) {
    let confirmacion = window.confirm(
      '¿Estás seguro que deseas borrar el ejercicio '+ nombre + '?'
    );
    if (confirmacion === true) {
      let url =
        'http://localhost:8080/pizarraBack/eliminarEjercicio?idUsr=' +
        this.props.usr +
        '&idArchivo=' +
        ejercicio + '&nombre=' + nombre;
      fetch(url)
        .then(response => response.text())
        .then(data => {
          if (data === 'eliminado') {
            alert('Se eliminó el ejercicio.');
            fetch(
              'http://localhost:8080/pizarraBack/servletTablaArchivos?idUsr=' +
              this.props.usr
            )
              .then(res => res.json())
              .then(
                (data) => {
                  this.setState({ isLoaded: true, ejercicios: data });
                  console.log(this.state.ejercicios);
                },
                (error) => {
                  this.setState({ isLoaded: true, error });
                });
          } else {
            alert('Houston, we have a problem.');
          }
        });
    }
  }

  render() {
    const { error, isLoaded, ejercicios } = this.state;
    if (error) {
      return <div>error: {error.message}</div>
    } else if (!isLoaded) {
      return <p className='text-center'>Cargando...</p>;
    } else {

      const listar = ejercicios.map(ejercicio => {
        return (
          <tr>
            <td>Ejercicio {ejercicio.nombre}</td>
            <td>
              <div>
                <ButtonGroup aria-label='Acciones'>
                  <Button
                    variant='outline-info'
                    className='boton'
                    name={'Ejercicio' + ejercicio.nombre}
                    size='sm'
                    href={
                      'http://localhost:8080/pizarraBack/crearejercicio?idUsr=' +
                      this.props.usr +
                      '&idArchivo=' +
                      ejercicio.numero + '&nombre=' + ejercicio.nombre +
                      '&ver=1'
                    }
                  >
                    Ver ejercicio
                  </Button>
                  <Button
                    variant='outline-secondary'
                    className='boton'
                    size='sm'
                    href={
                      'http://localhost:8080/pizarraBack/crearejercicio?idUsr=' +
                      this.props.usr +
                      '&idArchivo=' +
                      ejercicio.numero + '&nombre=' + ejercicio.nombre
                    }
                  >
                    Modificar ejercicio
                  </Button>
                  <Button
                    variant='outline-danger'
                    className='boton'
                    size='sm'
                    onClick={() => this.handleBorrarEjercicio(ejercicio.numero, ejercicio.nombre)}
                  >
                    Eliminar ejercicio
                  </Button>
                  <Button
                    variant='outline-dark'
                    className='boton'
                    size='sm'
                    onClick={() => this.handleCopiarEjercicio(ejercicio.numero, ejercicio.nombre)}
                  >
                    Copiar ejercicio
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
    }
  }
}
export default Tabla;
