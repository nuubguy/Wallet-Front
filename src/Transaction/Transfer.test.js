import React from 'react';
import {shallow} from 'enzyme';
import Transfer from "./Transfer";

describe('Transfer', () => {
    function renderTransaction(onAmountChange, onDescriptionChange, onFormSubmit, customer, transaction, onMyWalletSelect, onPayeeWalletSelect) {
        return shallow(<Transfer onAmountChange={onAmountChange} onDescriptionChange={onDescriptionChange}
                                 onFormSubmit={onFormSubmit} customer={customer} transaction={transaction}
                                 onMyWalletSelect={onMyWalletSelect} onPayeeWalletSelect={onPayeeWalletSelect}/>);
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
            const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
            expect(render.find('#form').length).toEqual(1);
        });

        it('should has one select field to choose wallet', () => {
            const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
            expect(render.find('.my-wallet').length).toEqual(1);
        });

        it('should has one input field of amount of money', () => {
            const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
            expect(render.find('.payee-wallet').length).toEqual(1);
        });

        it('should has one text area of description', () => {
            const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
            expect(render.find('#description').length).toEqual(1);
        });

        it('should has one submit button', () => {
            const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
            expect(render.find('#submit').length).toEqual(1);
        });
    });

    describe('input field of amount of money', () => {
        it('should call onAmountChange callback when input field of amount of money is changed', () => {
            const onAmountChange = jest.fn();
            const event = {target: {value: ''}};

            renderTransaction(onAmountChange, null, null, getCustomer(), getTransaction(), null, null).find('#amount').simulate('change', event);
            expect(onAmountChange).toHaveBeenCalled();

        });
    });

    describe('input field of description', () => {
        it('should call onDescriptionChange callback when input field of description is changed', () => {
            const onDescriptionChange = jest.fn();
            const event = {target: {value: ''}};

            renderTransaction(null, onDescriptionChange, null, getCustomer(), getTransaction(), null, null).find('#description').simulate('change', event);
            expect(onDescriptionChange).toHaveBeenCalled();

        });
    });

    describe('form', () => {
        it('should call submitForm callback when form submitted', () => {
            const onFormSubmit = jest.fn();

            renderTransaction(null, null, onFormSubmit, getCustomer(), getTransaction(), null, null).find('#form').simulate('submit');
            expect(onFormSubmit).toHaveBeenCalled();
        })
    });

    describe('my wallet select', () => {
        it('should call onMyWalletSelect callback when a wallet is selected', () => {
            const onMyWalletChange = jest.fn();
            const event = {target: {value: ''}};

            renderTransaction(null, null, null, getCustomer(), getTransaction(), onMyWalletChange, null).find('.my-wallet').simulate('change', event);
            expect(onMyWalletChange).toHaveBeenCalled();

        });
    });

    describe('payee wallet select', () => {
        it('should call onPayeeWalletSelect callback when a wallet is selected', () => {
            const onPayeeWalletSelect = jest.fn();
            const event = {target: {value: ''}};

            renderTransaction(null, null, null, getCustomer(), getTransaction(), null, onPayeeWalletSelect).find('.payee-wallet').simulate('change', event);
            expect(onPayeeWalletSelect).toHaveBeenCalled();

        });
    });
});
