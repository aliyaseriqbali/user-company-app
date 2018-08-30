import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            list: []
        };
    }

    render() {
        return (
            <div className="user-form">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome</h1>
                </header>
                <div
                    style={{
                        padding: 50,
                        textAlign: "left",
                        maxWidth: 500,
                        margin: "auto"
                    }}
                >
                    Add user
          <br />
                    <form className="form-inline">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Type username"
                          
                        />
                        <button
                            className="btn btn-secondary"
                        >
                            Add User
                        </button>
                    </form>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Company</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <td>företag</td>
                                <td> <button className="close" >x</button></td>
                            </tr>
                    
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserForm;

