import React from 'react';
import { shallow } from 'enzyme';
import Payee from './Payee';

describe('Payee', () => {
  function renderPayee(onAccountIdChange, onAddNewPayee, canSubmit, payee) {
    return shallow(<Payee
      onAccountIdChange={onAccountIdChange}
      onAddNewPayee={onAddNewPayee}
      canSubmit={canSubmit}
      payee={payee}
    />);
  }

  function getPayee() {
    return {
      accountId: '',
      customerName: {},
    };
  }

  describe('render', () => {
    it('should has a form', () => {
      const render = renderPayee(null, null, null, getPayee());
      expect(render.find('#form').length).toEqual(1);
    });

    it('should has input field of account id', () => {
      const render = renderPayee(null, null, null, getPayee());
      expect(render.find('#payee-account-id').length).toEqual(1);
    });

    it('should has submit button of account id', () => {
      const render = renderPayee(null, null, null, getPayee());
      expect(render.find('#submit-payee').length).toEqual(1);
    });
  });
});
