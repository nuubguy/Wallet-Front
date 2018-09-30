import React from 'react';
import {shallow} from 'enzyme';
import Transaction from "./Transaction";

describe('Transaction', () => {
    function renderTransaction(onAmountChange, onDescriptionChange, onFormSubmit, customer, transaction) {
        return shallow(<Transaction onAmountChange={onAmountChange} onDescriptionChange={onDescriptionChange}
                                    onFormSubmit={onFormSubmit} customer={customer} transaction={transaction}/>);
    }

    function getCustomer() {
        return {
            accountId: '',
            customer: {
                customerId: '',
                name: '',
                info: '',
                disabled: ''
            },
            balance: {
                amount: '',
                currency: ''
            }

        };
    }

    function getTransaction() {
        return {
            transactionType: '',
            amount: '',
            description: ''
        }
    }

    describe('render', () => {
        it('should has a form', () => {
            const render = renderTransaction(null, null, null, getCustomer(), getTransaction());
            expect(render.find('#form').length).toEqual(1);
        });

        it('should has one input field of amount of money', () => {
            const render = renderTransaction(null, null, null, getCustomer(), getTransaction());
            expect(render.find('#amount').length).toEqual(1);
        });

        it('should has one text area of description', () => {
            const render = renderTransaction(null, null, null, getCustomer(), getTransaction());
            expect(render.find('#description').length).toEqual(1);
        });

        it('should has one submit button', () => {
            const render = renderTransaction(null, null, null, getCustomer(), getTransaction());
            expect(render.find('#submit').length).toEqual(1);
        });
    });

    describe('input field of amount of money', () => {
        it('should call onAmountChange callback when input field of amount of money is changed', () => {
            const onAmountChange = jest.fn();
            const event = {target: {value: ''}};

            renderTransaction(onAmountChange, null, null, getCustomer(), getTransaction()).find('#amount').simulate('change', event);
            expect(onAmountChange).toHaveBeenCalled();

        });
    });

    describe('input field of description', () => {
        it('should call onDescriptionChange callback when input field of description is changed', () => {
            const onDescriptionChange = jest.fn();
            const event = {target: {value: ''}};

            renderTransaction(null, onDescriptionChange, null, getCustomer(), getTransaction()).find('#description').simulate('change', event);
            expect(onDescriptionChange).toHaveBeenCalled();

        });
    });

    describe('form', () => {
        it('should call submitForm callback when form submitted', () => {
            const onFormSubmit = jest.fn();

            renderTransaction(null, null, onFormSubmit, getCustomer(), getTransaction()).find('#form').simulate('submit');
            expect(onFormSubmit).toHaveBeenCalled();
        })
    });
});
