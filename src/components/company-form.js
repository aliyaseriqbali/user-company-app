import React, { Component } from "react";
import "../App.css";
import UserForm from "./user-form";
// import userList from './user-form'
class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyList: []
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
        const newCompany = {
            id: 1 + Math.random(),
            value: this.state.newCompany.slice()
        };
        // copy current list of items, adds the new item to it and updates the state 
        const companyList = [...this.state.companyList];
        companyList.push(newCompany);
        this.setState({
            companyList
        });
    }

    deleteItem(id) {
        // copy current list of items
        const companyList = [...this.state.companyList];
        // filter out the item being deleted and updates 
        const updatedList = companyList.filter(company => company.id !== id);
        this.setState({ companyList: updatedList });
        localStorage.setItem("companyList", JSON.stringify(updatedList));
    }
    
    
    render() {
        
        return (
            <div className="company-form">
                <div
                    style={{
                        padding: 50,
                        textAlign: "left",
                        maxWidth: 500,
                        margin: "auto"
                    }}
                >
                   <h3>Add a company to the list</h3>
                    <form className="form-inline">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Type username"
                            value={this.state.newCompany}
                            onChange={e => this.onChangeInput("newCompany", e.target.value)}
                        />
                        <button
                            className="btn btn-secondary"
                            onClick={() => this.addItem()}
                            disabled={!this.state.newCompany}
                        >
                            Add User
                        </button>
                    </form>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Company</th>
                               
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.companyList.map(company => {
                                return (
                                    <tr>
                                        <td key={company.id}>{company.value}</td>
                                       
                                        <td> <button className="close" onClick={() => this.deleteItem(company.id)}>x</button></td>
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

export default CompanyForm