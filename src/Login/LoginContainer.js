import React, {Component} from 'react';
import Login from "./Login";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import Menu from "../Menu/Menu";
import './Login.css'

//TODO create paging for transaction and save description for sorting

export default class LoginContainer extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false
        };
    }

    render() {
        if (this.state.redirect) {
            return <Menu onLogout={this.onLogout}/>
        }
        return (
            <section id={"login-section"}>
                <div id={"login-title"}>
                    <h1>Login</h1>
                </div>
                <Login
                    username={this.state.username} password={this.state.password}
                    changeUsername={this.onChangeUsername} changePassword={this.onChangePassword}
                    onSubmit={this.onSubmit}
                />
            </section>
        );
    }

    onChangeUsername = (input) => {
        this.setState(
            {
                username: input
            }
        )
    };

    onChangePassword = (input) => {
        this.setState(
            {
                password: input
            }
        )
    };

    onLogout = () => {
        localStorage.clear();
        this.setState({
            redirect: false
        })
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.setState({redirect: true});
        this.fetchData(this.state.username, this.state.password);
    };

    async fetchData(username, password) {
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());
        try {
            let result = await service.getAccountProfile(username, password);
            console.log(result);
            localStorage.setItem("customerId", username);
            localStorage.setItem("password", password);
            localStorage.setItem("accountId", result.data.accountList[0].accountId);

        } catch (e) {
            console.log(e);
        }
    }
}
