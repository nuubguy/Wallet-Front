import React from 'react';
import { shallow } from 'enzyme';
import Transfer from './Transfer';

describe('Transfer', () => {
  function renderTransaction(onAmountChange, onDescriptionChange, onFormSubmit, customer, transaction, onMyWalletSelect, onPayeeWalletSelect) {
    return shallow(<Transfer
      onAmountChange={onAmountChange}
      onDescriptionChange={onDescriptionChange}
      onFormSubmit={onFormSubmit}
      sender={customer}
      transaction={transaction}
      onMyWalletSelect={onMyWalletSelect}
      onPayeeWalletChange={onPayeeWalletSelect}
    />);
  }

  function getCustomer() {
    return {
      accountId: '',
      customer: {
        customerId: '',
        name: '',
        info: '',
        disabled: '',
      },
      balance: {
        amount: '',
        currency: '',
      },

    };
  }

  function getTransaction() {
    return {
      type: '',
      amount: '',
      description: '',
    };
  }

  describe('render', () => {
    it('should has a form', () => {
      const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
      expect(render.find('#form').length).toEqual(1);
    });

    it('should has one balance component to display balance', () => {
      const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
      expect(render.find('Balance').length).toEqual(1);
    });

    it('should has one input field of payee account', () => {
      const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
      expect(render.find('#payee-wallet').length).toEqual(1);
    });

    it('should has one input field of payee name', () => {
      const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
      expect(render.find('#payee-name').length).toEqual(1);
    });

    it('should has one button to check availability of payee account', () => {
      const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
      expect(render.find('#payee-wallet').length).toEqual(1);
    });

    it('should has one text area of description', () => {
      const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
      expect(render.find('#description').length).toEqual(1);
    });

    it('should has one submitTransaction button', () => {
      const render = renderTransaction(null, null, null, getCustomer(), getTransaction(), null, null);
      expect(render.find('#submit').length).toEqual(1);
    });
  });

  describe('input field of amount of money', () => {
    it('should call onAmountChange callback when input field of amount of money is changed', () => {
      const onAmountChange = jest.fn();
      const event = { target: { value: '' } };

      renderTransaction(onAmountChange, null, null, getCustomer(), getTransaction(), null, null).find('#amount').simulate('change', event);
      expect(onAmountChange).toHaveBeenCalled();
    });
  });

  describe('input field of description', () => {
    it('should call onDescriptionChange callback when input field of description is changed', () => {
      const onDescriptionChange = jest.fn();
      const event = { target: { value: '' } };

      renderTransaction(null, onDescriptionChange, null, getCustomer(), getTransaction(), null, null).find('#description').simulate('change', event);
      expect(onDescriptionChange).toHaveBeenCalled();
    });
  });

  describe('form', () => {
    it('should call submitForm callback when form submitted', () => {
      const onFormSubmit = jest.fn();

      renderTransaction(null, null, onFormSubmit, getCustomer(), getTransaction(), null, null).find('#form').simulate('submit');
      expect(onFormSubmit).toHaveBeenCalled();
    });
  });

  describe('payee wallet select', () => {
    it('should call onPayeeWalletChange callback when a wallet is selected', () => {
      const onPayeeWalletSelect = jest.fn();
      const event = { target: { value: '' } };

      renderTransaction(null, null, null, getCustomer(), getTransaction(), null, onPayeeWalletSelect).find('#payee-wallet').simulate('change', event);
      expect(onPayeeWalletSelect).toHaveBeenCalled();
    });
  });
});
