import React, { Component } from "react";
import "../App.css";

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    // Updating the state
    onChangeInput(key, value) {
        this.setState({ [key]: value });
    }
    // Adds new items to the array
    addItem() {
        // Iterates a unique ID, starting with 1 to the created user
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()
        };
        // copy current list of items, adds the new item to it and updates the state 
        const userList = [...this.state.userList];
        userList.push(newItem);
        this.setState({
            userList
        });
    }

    deleteItem(id) {
        // copy current list of items
        const userList = [...this.state.userList];
        // filter out the item being deleted and updates 
        const updatedList = userList.filter(item => item.id !== id);
        this.setState({ userList: updatedList });
        localStorage.setItem("userList", JSON.stringify(updatedList));
    }
    render() {
        return (
            <div className="user-form">
                <div
                    style={{
                        padding: 50,
                        textAlign: "left",
                        maxWidth: 500,
                        margin: "auto"
                    }}
                >
                    Add a user to the list
          <br />
                    <form className="form-inline">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Type username"
                            value={this.state.newItem}
                            onChange={e => this.onChangeInput("newItem", e.target.value)}
                        />
                        <button
                            className="btn btn-secondary"
                            onClick={() => this.addItem()}
                            disabled={!this.state.newItem}
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
                            {this.state.userList.map(item => {
                                return (
                                    <tr>
                                        <th key={item.id}>{item.value}</th>
                                        <td>företag</td>
                                        <td> <button className="close" onClick={() => this.deleteItem(item.id)}>x</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
