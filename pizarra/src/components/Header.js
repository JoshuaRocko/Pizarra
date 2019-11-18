import React, { Component } from 'react';
import logo from '../images/logo.svg'
import '../css/header.css'
class Header extends Component {
    render() {
        return (
            <div className="div-header">
                <header className="header">
                    <img src={logo} className="react-logo" alt="logo" />
                    <h1 className="h2">
                        Pizarrón <small className="text-muted">colaborativo</small>
                    </h1>
                </header>
            </div>
        );
    }
}

export default Header;