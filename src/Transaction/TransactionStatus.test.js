import React from 'react';
import {shallow} from 'enzyme';
import TransactionStatus from "./TransactionStatus";

describe('Transaction Status', () => {
    function setup() {
        return shallow(<TransactionStatus status={{}}/>);
    }

    describe('render', () => {
        it('should has a span', () => {
            const render = setup();
            expect(render.find('span').length).toEqual(1);
        });

    });
});
