import React from 'react';
import { shallow } from 'enzyme';
import PayeeContainer from './PayeeContainer';

describe('PayeeContainer', () => {
  function renderPayeeContainer() {
    return shallow(<PayeeContainer />);
  }

  describe('render', () => {
    it('should has a payee', () => {
      const render = renderPayeeContainer();
      expect(render.find('Payee').length).toEqual(1);
    });
  });

  describe('input of account id changes', () => {
    it('should update state', () => {
      const render = renderPayeeContainer();
      render.instance().onAccountIdChange('A00000001');

      expect(render.state().payee.accountId).toEqual('A00000001');
    });
  });
});
