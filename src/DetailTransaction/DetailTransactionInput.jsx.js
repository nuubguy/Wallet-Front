import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import '../Transaction/Transaction.css'

export default class DetailTransactionInput extends Component {

    render() {
        return (
            <form action="" onSubmit={this.props.formSubmit}>

                <label>Amount</label>
                <input id="amountInput"
                    value={this.props.amount}
                    type="number"
                    placeholder="input number in here !!"
                    min={1}
                    onChange={(e) =>{this.props.amountOnChange(e.target.value)}}
                />
                <label className="labelAmount">Decription</label>
                <input
                        id="descriptionInput"
                    value={this.props.description}
                    type="text"
                    placeholder="input text in here !!"
                    onChange={(e) =>{this.props.descriptionOnChange(e.target.value)}}
                />
                <button id="submit" type="submit">Filter</button>
                <Modal open={this.props.open} onClose={this.props.onCloseModal} center>
                    <h2>Transaction Not Found</h2>
                </Modal>
                <br/><br/>
                <img src="https://static.thenounproject.com/png/40256-200.png"
                     onClick={()=>this.props.imageOnClick()} style={{width:50,height:50}} visibility="hidden" alt=""/>
                <label>{this.props.notFoundMessage}</label>
            </form>
        );
    }
}
