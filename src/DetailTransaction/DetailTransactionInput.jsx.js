import React, { Component } from 'react';
import './DetailTransaction.css';
import Resource from '../Resource/Resource';

export default class DetailTransactionInput extends Component {
  render() {
    const { sort } = this.props;
    return (
      <div>
        <h3>Filter Transaction</h3>
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
            {
                this.imageSort(sort)
            }

          <button id="filter-button" type="submit">Filter</button>

          <label>{this.props.notFoundMessage}</label>
        </form>
      </div>
    );
  }
  imageSort = (sort) =>{
      if(sort === 1) {
          console.log(sort);
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
          console.log("A " +sort);
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
