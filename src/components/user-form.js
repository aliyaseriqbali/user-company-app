import React, { Component } from "react";
import "../App.css";

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCompany:"",
            newUser:"",
            userList: []
        };
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }
    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        for (let key in this.state) {
            if (localStorage.hasOwnProperty(key)) {
                let value = localStorage.getItem(key);
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    this.setState({ [key]: value });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        for (let key in this.state) {
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }
    onChangeInput(key, value) {
        this.setState({ [key]: value });
    }

    onChangeDropdown(key, value) {
        this.setState({ [key]: value });
    }

    addUser() {
        const newUser = {
            id: 1 + Math.random(),
            value: this.state.newUser,
            company: this.state.userCompany
 
        };
        const userList = [...this.state.userList];
        userList.push(newUser);
        this.setState({
            userList
        });
        this.setState({newUser: ""})
    }

    deleteUser(id) {
        const userList = [...this.state.userList];
        const updatedList = userList.filter(user => user.id !== id);
        this.setState({ userList: updatedList });
        localStorage.setItem("userList", JSON.stringify(updatedList));
    }
    render() {
        return (
            <div className="user-form">
                    <h3>Add a user to the list</h3>

                    <form className="form-inline">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Type username"
                            value={this.state.newUser}
                            onChange={e => this.onChangeInput("newUser", e.target.value)}
                        />

                        <select 
                        className="select-company"
                        name="Company" 
                        id="dropdown"
                        value={this.state.userCompany}
                        onChange={e => this.onChangeDropdown("userCompany", e.target.value)}
                        >
                        <option className="company-option" value=""> </option>
                            {JSON.parse(localStorage.getItem("companyList")).map(user =>
                                <option className="company-option" key={user.key} value={user.key} key={user.id}>{user.value}</option>
                            )};
                        </select>

                        <button
                            className="btn btn-secondary"
                            onClick={() => this.addUser()}
                            disabled={!this.state.newUser}
                        >
                            Add User
                        </button>
                    </form>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Company</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.userList.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td key={user.id}>{user.value}</td>
                                        <td>{user.company}</td>
                                        <td> <button className="close" onClick={() => this.deleteUser(user.id)}>x</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
            </div>
        );
    }
}

export default UserForm