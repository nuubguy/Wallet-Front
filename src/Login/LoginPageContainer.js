import React, {Component} from 'react';
import Loginform from "./LoginForm";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import Menu from "../Menu/Menu";

//TODO create paging for transaction and save description for sorting

export default class LoginPageContainer extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: false
        };
    }

    async componentDidMount() {

    }


    changeUsername = (input) => {
        console.log(input);
        this.setState(
            {
                username: input
            }
        )
    };

    changePassword = (input) => {
        console.log(input);
        this.setState(
            {
                password: input
            }
        )
    }

    render() {
        if (this.state.redirect) {
            return <Menu onLogout={this.onLogout}/>
        }
        return (
            <section>
                <Loginform
                    username={this.state.username} password={this.state.password}
                    changeUsername={this.changeUsername} changePassword={this.changePassword}
                    onSubmit={this.onSubmit}
                />
            </section>
        );
    }

    onLogout = () => {
        localStorage.clear();
        this.setState({
            redirect: false
        })
    }
    onSubmit = (e) => {
        this.setState({redirect: true});
        e.preventDefault();
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
