import React from 'react';
import {shallow} from 'enzyme';
import TransactionList from "./TransactionList";

describe('Transaction', () => {
    function renderTransactionList() {
        return shallow(<TransactionList transactions={[]}/>);
    }

    describe('render', () => {
        it('should has a table of last five transactions', () => {
            const transactionList = renderTransactionList();
            expect(transactionList.find('#last-five-transactions').length).toEqual(1);
        });

        it('should has five table head', () => {
            const transactionList = renderTransactionList();
            expect(transactionList.find('th').length).toEqual(5);
        });
    });
});
