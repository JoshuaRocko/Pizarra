import React, { Component } from 'react';
import '../css/login.css';
import '../css/util.css';
import '../fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Redirect } from 'react-router-dom';
import VentanaModal from './VentanaModal';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      contra: '',
      redirect: false,
      mostrarModal: false,
      mostrarLabel: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.usuario && this.state.contra) {
      let url =
        'http://localhost:8080/pizarraBack/servletLogin?usr=' +
        this.state.usuario +
        '&psw=' +
        this.state.contra +
        '&tkn=24';
      fetch(url)
        .then(response => response.text())
        .then(data => {
          if (data === 'Invalido') {
            //alert('Houston, we have a problem.');
            this.setState({ contra: '', usuario: '', mostrarModal: true });
          } else {
            sessionStorage.setItem('usuario', data);
            this.setState({ redirect: true });
          }
        });
    } else {
      this.setState({ mostrarLabel: true });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/main/'} />;
    }

    if (sessionStorage.getItem('usuario')) {
      return <Redirect to={'/main/'} />;
    }
    let cerrarModal = () => this.setState({ mostrarModal: false });
    let mostrar = ['wrap-input100 validate-input'];
    if (this.state.mostrarLabel) {
      mostrar.push('alert-validate');
    }
    return (
      <div>
        <VentanaModal
          show={this.state.mostrarModal}
          onHide={cerrarModal}
          cuerpo={
            'Lo sentimos, no pudimos encontrar esa combinación de nombre de usuario y contraseña.'
          }
        />
        <div className='limiter'>
          <div className='container-login100'>
            <div className='wrap-login100 p-t-30 p-b-50'>
              <span className='login100-form-title p-b-41'>
                Iniciar sesión.
              </span>
              <form
                className='login100-form validate-form p-b-33 p-t-5'
                onSubmit={this.handleSubmit}
              >
                <div
                  className={mostrar.join(' ')}
                  data-validate='Ingresa tu nombre de usuario.'
                >
                  <input
                    className='input100'
                    type='text'
                    name='usuario'
                    placeholder='Nombre de usuario.'
                    value={this.state.usuario}
                    onChange={this.onChange}
                  ></input>
                  <span
                    className='focus-input100'
                    data-placeholder='&#xe82a;'
                  ></span>
                </div>
                <div
                  className={mostrar.join(' ')}
                  data-validate='Ingresa tu contraseña.'
                >
                  <input
                    className='input100'
                    type='password'
                    name='contra'
                    placeholder='Contraseña.'
                    value={this.state.contra}
                    onChange={this.onChange}
                  ></input>
                  <span
                    className='focus-input100'
                    data-placeholder='&#xe80f;'
                  ></span>
                </div>
                <div className='container-login100-form-btn m-t-32'>
                  <button className='login100-form-btn'>Iniciar sesión.</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
