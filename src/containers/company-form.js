import React, { Component } from "react";
import "../App.css";
import userList from './user-form'
export default class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CompanyList: []
        };
    }

    render() {
        return (
            <div className="company-form">
                <h3>Company</h3>
            </div>
        );
    }
}
