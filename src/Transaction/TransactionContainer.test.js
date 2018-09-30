import TransactionContainer from "./TransactionContainer";
import React from "react";
import {shallow} from "enzyme";

describe('TransactionContainer', () => {

    function renderTransactionContainer() {
        return shallow(<TransactionContainer transaction={{}}/>);
    }

    describe('render', () => {
        it('should has two route', () => {
            const render = renderTransactionContainer();
            expect(render.find('Route').length).toEqual(3);
        });

        it('should contains withdraw route', () => {
            const render = renderTransactionContainer();
            const withdraw = render.find('Route').at(0);
            expect(withdraw.props().path).toBe('/transaction/withdraw');
        });

        it('should contains top-up route', () => {
            const render = renderTransactionContainer();
            const withdraw = render.find('Route').at(1);
            expect(withdraw.props().path).toBe('/transaction/top-up');
        });

        it('should contains transfer route', () => {
            const render = renderTransactionContainer();
            const withdraw = render.find('Route').at(2);
            expect(withdraw.props().path).toBe('/transaction/transfer');
        });

        it('should has a modal', () => {
            const render = renderTransactionContainer();
            expect(render.find('Modal').length).toEqual(1);
        });
    });

    describe('input of amount of money changes', () => {
        it('should update state', () => {
            const render = renderTransactionContainer();
            render.instance().onAmountChange('100');

            expect(render.state().transaction.amount).toEqual('100');
        })
    });

    describe('input of description changes', () => {
        it('should update state', () => {
            const render = renderTransactionContainer();
            render.instance().onDescriptionChange('Movie');

            expect(render.state().transaction.description).toEqual('Movie');
        })
    });
});
