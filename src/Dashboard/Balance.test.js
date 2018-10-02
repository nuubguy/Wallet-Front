import React from 'react';
import {shallow} from 'enzyme';
import Balance from "./Balance";

describe('Balance', () => {
    function renderDashboard(sender) {
        return shallow(<Balance sender={sender}/>);
    }

    describe('render', () => {
        it('should has one image', () => {
            const sender = {balance: {amount: '', currency: ''}};
            const dashboard = renderDashboard(sender);
            expect(dashboard.find('img').length).toEqual(1);
        });

        it('should has one span for balance value', () => {
            const sender = {balance: {amount: '', currency: ''}};
            const dashboard = renderDashboard(sender);
            expect(dashboard.find('span').length).toEqual(1);
        });
    });
});
