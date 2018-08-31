import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'


import logo from "../logo.svg";
import "../App.css";
import UserForm from './user-form';
import CompanyForm from './company-form'

class MainLayout extends Component {
    render() {
        return (
            <div className="main-layout">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React LocalStorage Tutorial</h1>
                </header>
                <aside>
                    <nav className="navbar navbar-expand-sm bg-light navbar-light">
                        <ul className="navbar-nav">
                            <li className="navbar-item">
                                <a href="/users" className="nav-link">Users</a>
                            </li>
                            <li className="navbar-item">
                                <a href="/companies" className="nav-link">Companies</a>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main>
                    <Router>
                        <div>
                            <Route path="/users" component={UserForm} exact />

                            <Route path="/companies" component={CompanyForm} exact />
                        </div>
                    </Router>
                </main>
            </div>
        )
    }
}

export default MainLayout
