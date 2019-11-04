import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.svg';
import '../App.css';

class Header extends Component {
    render() {
        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="h2">
                    Pizarrón <small className="text-muted">colaborativo</small>
                </h1>
            </header>
            </div>
        );
    }
}

export default Header;