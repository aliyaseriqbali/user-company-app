import React, { Component } from "react";
import "../App.css";

class defaultUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCompany: "",
            userName: "",
            selectedUser: {},
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
    selectUser(user) {
        this.setState({ userName: user.value })
        this.setState({ selectedUser: user })
    }

    onChangeDropdown(key, value) {
        this.setState({ [key]: value });
    }

    updateUser() {
        let userList = JSON.parse(localStorage.getItem("userList"))

        for (let user in userList) {
            if (userList[user].id === this.state.selectedUser.id) {
                userList[user].company = this.state.userCompany
            }
        }
        this.setState({ userList: userList })
        this.setState({ userName: "" })
    }

    render() {
        return (
            <div className="default-user">
                <h3>Users with no companies</h3>
                <form className="form-inline">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Press on a user"
                        value={this.state.userName}
                        onChange={e => this.onChangeInput("userName", e.target.value)}
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
                        onClick={() => this.updateUser()}
                        disabled={!this.state.userCompany}
                    >
                        Update User
                        </button>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userList.filter(
                            user => user.company === undefined || user.company === "")
                            .map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td key={user.id} onClick={e => this.selectUser(user)}>{user.value}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default defaultUser
