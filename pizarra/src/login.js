import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './componentes/formLogin/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './componentes/formLogin/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './componentes/formLogin/vendor/animate/animate.css';
import './componentes/formLogin/vendor/css-hamburgers/hamburgers.min.css';
import './componentes/formLogin/vendor/animsition/css/animsition.min.css';
import './componentes/formLogin/vendor/select2/select2.min.css';
import './componentes/formLogin/vendor/daterangepicker/daterangepicker.css';
import './componentes/formLogin/css/util.css';
import './componentes/formLogin/css/main.css';
import ReactDOM from 'react-dom';
import Main from './main';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { usuario: '', contra: '' }
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) {
    this.setState({ usuario: event.target.value })
  }

  handleChange2(event) {
    this.setState({ contra: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    //const data = new FormData(event.target);

    let url = 'http://localhost:8080/pizarraBack/servletLogin?usr=' + this.state.usuario + "&psw=" + this.state.contra + "&tkn=24";
    //alert('URL ' + url);
    fetch(url).then(response => response.text()).then(data => {
      //alert(data);
      //window.location.href = data;
      if (data == 'Invalido') {
        alert('Houston, we have a problem.');
        this.setState({contra: '', usuario:''});
      } else {
        ReactDOM.render(
          <Main usr={data}/>,
          document.getElementById('root')
        );
      }
    });
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Iniciar sesión.</span>
            <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={this.handleSubmit}>
              <div className="wrap-input100 validate-input" data-validate="Ingresa tu nombre de usuario.">
                <input className="input100" type="text" name="usr" placeholder="Nombre de usuario." value={this.state.usuario} onChange={this.handleChange1}></input>
                <span className="focus-input100" data-placeholder="&#xe82a;"></span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Ingresa tu contraseña.">
                <input className="input100" type="password" name="psw" placeholder="Contraseña." value={this.state.contra} onChange={this.handleChange2}></input>
                <span className="focus-input100" data-placeholder="&#xe80f;"></span>
              </div>

              <div className="container-login100-form-btn m-t-32">
                <button className="login100-form-btn">Iniciar sesión.</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
