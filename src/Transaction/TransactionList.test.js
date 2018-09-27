import React from 'react';
import {shallow} from 'enzyme';
import TransactionList from "./TransactionList";

describe('Transaction', () => {
    function setup() {
        return shallow(<TransactionList transactions={[]}/>);
    }

    describe('render', () => {
        it('should has a table of last five transactions', () => {
            const render = setup();
            expect(render.find('#last-five-transactions').length).toEqual(1);
        });

        it('should has four table head', () => {
            const render = setup();
            expect(render.find('th').length).toEqual(4);
        });
    });
});
