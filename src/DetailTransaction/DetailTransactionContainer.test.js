import { shallow } from 'enzyme/build';
import React from 'react';
import DetailTransactionContainer from './DetailTransactionContainer';
import mockAxios from '../__mocks__/axios';

describe('Transaction Container', () => {
  describe('render', () => {
    it('should have two component in render', () => {
      const renderedComponent = shallow(<DetailTransactionContainer />);
      expect(renderedComponent.find('section').find('DetailTransactionInput').length).toBe(1);
      expect(renderedComponent.find('section').find('TransactionList').length).toBe(1);
    });
  });

  describe('amountOnChange', () => {
    it('should change the amount when the input change', () => {
      const renderedComponent = shallow(<DetailTransactionContainer />);
      const firstAmount = 4000;
      renderedComponent.instance().amountOnChange(firstAmount);

      expect(renderedComponent.state().amount).toBe(4000);
    });
  });

  describe('amountOnChange', () => {
    it('should change the amount when the input change', () => {
      const renderedComponent = shallow(<DetailTransactionContainer />);
      const firstAmount = 4000;
      renderedComponent.instance().amountOnChange(firstAmount);

      expect(renderedComponent.state().amount).toBe(4000);
    });
  });

  describe('descriptionOnChange', () => {
    it('should change the description when the input change', () => {
      const renderedComponent = shallow(<DetailTransactionContainer />);
      const decription = 'aiueo';
      renderedComponent.instance().descriptionOnChange(decription);

      expect(renderedComponent.state().description).toBe('aiueo');
    });


    it('should run post method', async () => {
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({
        data: [],
      }));
      const renderedContainer = shallow(<DetailTransactionContainer />);
      renderedContainer.setState({ transactions: [] });

      renderedContainer.instance().formSubmit({
        preventDefault: () => {
        },
      });

      expect(mockAxios.get).toHaveBeenCalledTimes(6);
    });
  });
});
