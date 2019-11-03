import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.svg';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="h2">
                    Pizarrón <small className="text-muted">colaborativo</small>
                </h1>
            </header>
        );
    }
}

export default Header;