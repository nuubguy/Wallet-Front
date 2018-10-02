import React from "react";
import {shallow} from "enzyme";
import TransferContainer from "./TransferContainer";

describe('TransactionContainer', () => {

    function renderTransferContainer() {
        return shallow(<TransferContainer transaction={{}}/>);
    }

    describe('render', () => {
        it('should contains transaction title', () => {
            const render = renderTransferContainer();
            expect(render.find('.transaction-title').length).toEqual(1);
        });

        it('should contains transfer component', () => {
            const render = renderTransferContainer();
            expect(render.find('Transfer').length).toEqual(1);
        });

        it('should has a modal', () => {
            const render = renderTransferContainer();
            expect(render.find('Modal').length).toEqual(1);
        });
    });

    describe('input of amount of money changes', () => {
        it('should update state', () => {
            const render = renderTransferContainer();
            render.instance().onAmountChange('100');

            expect(render.state().transaction.amount).toEqual('100');
        })
    });

    describe('input of description changes', () => {
        it('should update state', () => {
            const render = renderTransferContainer();
            render.instance().onDescriptionChange('Movie');

            expect(render.state().transaction.description).toEqual('Movie');
        })
    });

    describe('my wallet changes', () => {
        it('should update state', () => {
            const render = renderTransferContainer();
            render.instance().onMyWalletSelect('A00000001');

            expect(render.state().transferTransaction.myWallet).toEqual('A00000001');
        })
    });

    describe('payee wallet changes', () => {
        it('should update state', () => {
            const render = renderTransferContainer();
            render.instance().onPayeeWalletSelect('A00000002');

            expect(render.state().transferTransaction.payeeWallet).toEqual('A00000002');
        })
    });
});
