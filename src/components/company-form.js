import React, { Component } from "react";
import "../App.css";
import { Collapse } from 'reactstrap';


// import userList from './user-form'
class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyList: [],
            collapse: "",
            companyUserList: []
        };
        this.toggle = this.toggle.bind(this);

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
            value: this.state.newCompany
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

    deleteUser(userId) {
        let userList = JSON.parse(localStorage.getItem("userList"))

        let companyID = ""
        for (let user in userList) {
            if (userList[user].id === userId) {
                companyID = userList[user].company
                userList[user].company = ""
            }
        }

        localStorage.setItem("userList", JSON.stringify(userList));
        const updatedCompanyUserList = JSON.parse(localStorage.getItem("userList")).filter(
            user => user.company === companyID
        )

        if (updatedCompanyUserList === undefined || updatedCompanyUserList.length === 0) {
            this.setState({ collapse: "" })
        }

        this.setState({ companyUserList: updatedCompanyUserList });
    }

    toggle(company) {
        const companyUserList = JSON.parse(localStorage.getItem("userList")).filter(
            user => user.company === company.value
        )

        if (companyUserList === undefined || companyUserList.length === 0) {
            return
        }
        this.setState({ companyUserList: companyUserList })

        if (this.state.collapse === company.id) {
            this.setState({ collapse: "" })
        } else {
            this.setState({ collapse: company.id })
        }
    }

    render() {
        return (
            <div className="company-form">
                <h3>Add a company to the list</h3>
                <form className="form-inline">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Type company name"
                        value={this.state.newCompany}
                        onChange={e => this.onChangeInput("newCompany", e.target.value)}
                    />
                    <button
                        className="btn btn-secondary"
                        onClick={() => this.addItem()}
                        disabled={!this.state.newCompany}
                    >
                        Add Company
                        </button>
                </form>
                {/* <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                        </tr>
                    </thead>
                     */}
                <h5 className="company-header">Company</h5>
                <div className="company-table">
                    {this.state.companyList.map(company => {
                        return (  
                            <ul key={company.id}>
                                <li key={company.id} onClick={() => this.toggle(company)}>{company.value}
                                    <button className="close remove-user" onClick={() => this.deleteItem(company.id)}>x</button>
                                </li>
                                <li>
                                    <Collapse isOpen={company.id === this.state.collapse}>

                                        {this.state.companyUserList.map(user =>
                                            <li className="company-user" key={company.id + user.id}>{user.value}
                                                <button className="close remove-user" onClick={() => this.deleteUser(user.id)}>x</button>
                                            </li>
                                        )}

                                    </Collapse>
                                </li>
                            </ul>
                        )
                    })}
                </div>
                {/* </table> */}
            </div>
        );
    }
}

export default CompanyForm
