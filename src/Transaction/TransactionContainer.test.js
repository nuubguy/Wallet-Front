import TransactionContainer from "./TransactionContainer";
import React from "react";
import {shallow} from "enzyme";

describe('TransactionContainer', () => {

    function setup() {
        return shallow(<TransactionContainer transaction={{}}/>);
    }

    describe('render', () => {
        it('should has transaction status component', () => {
            const render = setup();
            expect(render.find('TransactionStatus').length).toEqual(1);
        });

        it('should has transaction component', () => {
            const render = setup();
            expect(render.find('Transaction').length).toEqual(1);
        });

        it('should has transaction list component', () => {
            const render = setup();
            expect(render.find('TransactionList').length).toEqual(1);
        });
    });

    describe('input of amount of money changes', () => {
        it('should update state', () => {
            const render = setup();
            render.instance().onAmountChange('100');

            expect(render.state().transaction.amount).toEqual('100');
        })
    })

    describe('type of transaction changes', () => {
        it('should update state', () => {
            const render = setup();
            render.instance().onTypeChange('Withdraw');

            expect(render.state().transaction.type).toEqual('Withdraw');
        })
    })
});
