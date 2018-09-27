import React from 'react';
import {shallow} from 'enzyme';
import Transaction from "./Transaction";

describe('Transaction', () => {
    function setup(onAmountChange, onTypeChange, onFormSubmit) {
        return shallow(<Transaction onAmountChange={onAmountChange} onTypeChange={onTypeChange} onFormSubmit={onFormSubmit}/>);
    }

    describe('render', () => {
        it('should has one input amount field', () => {
            const render = setup();
            expect(render.find('#amount').length).toEqual(1);
        });

        it('should has two option of transaction', () => {
            const render = setup();
            expect(render.find('option').length).toEqual(2);
        });

        it('should has one submit button', () => {
            const render = setup();
            expect(render.find('#submit').length).toEqual(1);
        });
    });

    describe('input field of amount of money', () => {
        it('should call onAmountChange callback when input field is changed', () => {
            const onAmountChange = jest.fn();
            const event = {target: {value: ''}};

            setup(onAmountChange, null, null).find('#amount').simulate('change', event);
            expect(onAmountChange).toHaveBeenCalled();

        });
    });

    describe('select option of transaction type', () => {
        it('should call onTypeChange callback when selected option is changed', () => {
            const onTypeChange = jest.fn();
            const event = {target: {value: ''}};

            setup(null, onTypeChange, null).find('select').simulate('change', event);
            expect(onTypeChange).toHaveBeenCalled();
        })
    });

    describe('form', () => {
        it('should call submitForm callback when form submitted', () => {
            const onFormSubmit = jest.fn();

            setup(null, null, onFormSubmit).find('#form').simulate('submit');
            expect(onFormSubmit).toHaveBeenCalled();
        })
    });
});
