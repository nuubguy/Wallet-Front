import React, { Component } from 'react';
import './DetailTransaction.css';
import Resource from '../Resource/Resource';

export default class DetailTransactionInput extends Component {
  render() {
    const { sort } = this.props;
    return (
      <div>
        <h3>Transaction History</h3>
        <form action="" className="filter-form" onSubmit={this.props.formSubmit}>
          <input
            id="amountInput"
            value={this.props.amount}
            type="number"
            placeholder="Amount"
            min={1}
            onChange={(e) => {
              this.props.amountOnChange(e.target.value);
            }}
          />
          <input
            id="descriptionInput"
            value={this.props.description}
            type="text"
            placeholder="Description"
            onChange={(e) => {
              this.props.descriptionOnChange(e.target.value);
            }}
          />

          <button id="filter-button" type="submit">Filter</button>

            {
                this.imageSort(sort)
            }

          <label>{this.props.notFoundMessage}</label>
        </form>
      </div>
    );
  }
  imageSort = (sort) =>{
      if(sort === 1) {
          return (
              <img
                  src={Resource.ARROW_UP}
                  id="filter-image"
                  onClick={() => this.props.imageOnClick()}
                  alt="Filter"
              />
          )
      }
      else {
          return (
              <img
                  src={Resource.ARROW_DOWN}
                  id="filter-image"
                  onClick={() => this.props.imageOnClick()}
                  alt="Filter"
              />
          )
      }
  }
}
