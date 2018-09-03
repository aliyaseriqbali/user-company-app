import React, { Component } from "react";
import "../App.css";

class defaultUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCompany:"",
            userName: "",
            selectedUser: {},
            userList: []
        };
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
        // add event listener to save state to localStorage before updating the page
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
        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    // Gets the data and parse it 
    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);
                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }

    // save to localStorage (as a string, because its required by JSON)
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
        this.setState({userList:userList})
        this.setState({userName: ""})
        this.setState({userCompany: ""})
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
