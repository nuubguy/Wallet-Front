import React, {Component} from 'react';
import DetailTransactionInput from "./DetailTransactionInput.jsx";
import AccountService from "../Api/AccountService";
import Customer from "../Utilities/Constant";
import Endpoint from "../Api/Endpoint";
import TransactionList from "../Dashboard/TransactionList";
//TODO create paging for transaction and save description for sorting
export default class DetailTransactionContainer extends Component {
    constructor() {
        super();
        this.state = {
            transactions:[],
            description:'',
            amount:'',
            sort:0,
            notFoundMessage:'',
            open:false,
        };
    }

    async componentDidMount(){
        const transactions = await this.inputValidation();
        if (transactions.data.length===0){
            this.onOpenModal()
        }
        this.setState({
            transactions: transactions.data
        })
    }


    inputValidation(){
        const service = new AccountService(Customer.id(), Customer.accountId(), Endpoint.baseUrl());
        let transactions = service.getAllTransactionList(this.state.sort)
        if(this.state.description!==''&&this.state.amount===''){
            transactions =service.getTransactionListBasedOnDescription(this.state.description,this.state.sort)
        }
        if (this.state.description===''&&this.state.amount!==''){
            transactions = service.getTransactionListBasedOnAmount(parseFloat(this.state.amount),this.state.sort)
        }
        if (this.state.description!==''&& this.state.amount!==''){
            transactions = service.getTransactionListBasedOnAmountAndDescription(parseFloat(this.state.amount),this.state.description,
                this.state.sort)
        }
        return transactions
    }

    render() {
        return (
            <section>
                <DetailTransactionInput
                amount={this.state.amount}
                amountOnChange={this.amountOnChange}
                description={this.state.description}
                descriptionOnChange={this.descriptionOnChange}
                formSubmit={this.formSubmit}
                imageOnClick={this.imageOnClick}
                notFoundMessage={this.state.notFoundMessage}
                onOpenModal={this.onOpenModal}
                onCloseModal={this.onCloseModal}
                open={this.state.open}
                />
                <TransactionList transactions={this.state.transactions}/>
            </section>
        );
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    amountOnChange = (value) =>{
        this.setState({
            amount:value
        })
    }

    descriptionOnChange = (value) =>{
        this.setState({
            description:value
        })
    }

    formSubmit = (event) =>{
        event.preventDefault()
        console.log(this.state.sort)
        this.componentDidMount()
        this.setState({
            description:'',
            amount:'',
        })
    }

    imageOnClick= () =>{
        this.setState({
            sort: (this.state.sort!==1)? 1:2,
        })
        console.log(this.state.sort)
        this.componentDidMount()
    }







}
