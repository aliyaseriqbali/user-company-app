import React, { Component } from "react";
import "../index.css";

class defaultUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyList: [],
            selectedCompanyId: 0,
            selectedCompany: "",
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

    onChangeInput(key, value) {
        this.setState({ [key]: value });
    }

    onChangeDropdown(key, value, companyId) {
        this.setState({ [key]: value });
        this.setState({ selectedCompanyId: companyId })
    }

    updateUser() {
        let userList = this.state.userList
        for (let user in userList) {
            if (userList[user].id === this.state.selectedUser.id) {
                userList[user].company = this.state.selectedCompanyId
                userList[user].value = this.state.userName
            }
        }
        this.setState({ userList: userList })
        this.setState({ userName: "" })
        this.setState({ selectedCompany: "" })
        this.setState({ selectedCompanyId: 0 })
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
                        onClick={() => this.updateUser()}
                        disabled={!this.state.selectedCompanyId}
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
                            user => user.company === undefined || user.company == 0)
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
