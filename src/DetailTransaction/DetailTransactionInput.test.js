import { shallow } from 'enzyme/build';
import React from 'react';
import DetailTransactionInput from './DetailTransactionInput.jsx';

describe('Transaction Input', () => {
    describe('render', () => {
        function setup() {
            const props =
            {
                transactions:[],
                    description:'',
                amount:'',
                sort:false,
                notFoundMessage:'',
            };
            return shallow(<DetailTransactionInput />).setProps(props);
        }

        it('should call amountOnChange when the input change ', () => {
            const callbackFn = jest.fn();
            const renderedComponent = setup().setProps({ amountOnChange: callbackFn });

            renderedComponent.find('#amountInput').simulate('change', { target: {} });
            expect(callbackFn).toHaveBeenCalled();
        });

        it('should descriptionOnChange when the input description is change', function () {
            const callbackFn = jest.fn();
            const renderedComponent = setup().setProps({ descriptionOnChange: callbackFn });

            renderedComponent.find('#descriptionInput').simulate('change', { target: {} });
            expect(callbackFn).toHaveBeenCalled();
        });

        it('should formSubmit when form has been submitted', function () {
            const callbackFn = jest.fn();
            const renderedComponent = setup().setProps({ formSubmit: callbackFn });

            renderedComponent.find('form').simulate('submit');
            expect(callbackFn).toHaveBeenCalled();
        });

    });
});
