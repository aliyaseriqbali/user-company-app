import React, { Component } from "react";
import "../App.css";
import { Collapse } from 'reactstrap';

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
    addItem() {
        const newCompany = {
            id: 1 + Math.random(),
            value: this.state.newCompany
        };
        const companyList = [...this.state.companyList];
        companyList.push(newCompany);
        this.setState({
            companyList
        });

    }
    deleteItem(id) {
        const companyList = [...this.state.companyList];
        const updatedList = companyList.filter(company => company.id !== id);
        this.setState({ companyList: updatedList });
        localStorage.setItem("companyList", JSON.stringify(updatedList));
    }

    deleteUserName(userId) {
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
                                                <button className="close remove-user" onClick={() => this.deleteUserName(user.id)}>x</button>
                                            </li>
                                        )}
                                    </Collapse>
                                </li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default CompanyForm
