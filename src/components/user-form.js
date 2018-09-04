import React, { Component } from "react";
import "../index.css";

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyList: [],
            selectedCompanyId: 0,
            newUser: "",
            selectedCompany: "",
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

    onChangeDropdown(key, value, companyId) {
        this.setState({ [key]: value });
        this.setState({ selectedCompanyId: companyId })
    }

    addUser() {
        const newUser = {
            id: 1 + Math.random(),
            value: this.state.newUser,
            company: this.state.selectedCompanyId

        };
        const userList = [...this.state.userList];
        userList.push(newUser);
        this.setState({
            userList
        });
        this.setState({ newUser: "" })
        this.setState({ selectedCompany: "" })
        this.setState({ selectedCompanyId: 0 })
    }

    deleteUser(id) {
        const userList = [...this.state.userList];
        const updatedList = userList.filter(user => user.id !== id);
        this.setState({ userList: updatedList });
        localStorage.setItem("userList", JSON.stringify(updatedList));
    }

    getCompanyName(companyID) {
        let companyList = this.state.companyList
        for (let company in companyList) {
            if (companyList[company].id == companyID) {
                return companyList[company].value
            }
        }
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
                        value={this.state.selectedCompany}
                        onChange={e => this.onChangeDropdown("selectedCompany", e.target.value, e.target.options[e.target.selectedIndex].id)}
                    >
                        <option className="company-option" key={0} id={0} value={0}> </option>
                        {this.state.companyList.map(company =>
                            <option className="company-option" value={company.value} key={company.id} id={company.id}>{company.value}</option>
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
                                    <td>{this.getCompanyName(user.company)}</td>
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