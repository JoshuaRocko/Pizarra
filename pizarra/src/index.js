import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Principal from './components/Principal';

class Index extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact strict path='/main/' component={Principal} />
          <Route path='*' component={() => '404 Not Found'} />
        </Switch>
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
