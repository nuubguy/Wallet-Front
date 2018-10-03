import React, {Component} from 'react';
import Loginform from "./LoginForm";
import AccountService from "../Api/AccountService";
import Constant from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";

//TODO create paging for transaction and save description for sorting

export default class LoginPageContainer extends Component {
    constructor() {
        super();
        this.state = {
            username:'',
            password:'',

        };
    }

    async componentDidMount() {

    }


    changeUsername= (input) =>{
        console.log(input)
        this.setState(
            {
                username: input
            }
        )
    }

    changePassword= (input) =>{
        console.log(input);
        this.setState(
            {
                password: input
            }
        )
    }



    render() {
        return (
            <section>
                <Loginform username={this.state.username} password={this.state.password}
                           changeUsername={this.changeUsername} changePassword={this.changePassword}
                onSubmit={this.onSubmit}/>
            </section>
    );
    }

    onSubmit= (e) =>{
        e.preventDefault();
        this.fetchData(this.state.username,this.state.password);

        this.setState({
            username:'',
            password:'',
        })


    }

    async fetchData(username,password){
        const service = new AccountService(Constant.id(), Constant.accountId(), Endpoint.baseUrl());

        try {
            let result = await service.getAccountProfile(username,password)
            console.log(result)
        }catch (e) {
            console.log(e);
        }


    }

}
