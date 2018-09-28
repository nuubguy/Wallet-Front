import React from 'react';
import {shallow} from 'enzyme';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
    function renderDashboard(customer) {
        return shallow(<Dashboard customer={customer}/>);
    }

    describe('render', () => {
        it('should has one div', () => {
            const customer = {account: {amount: 0}};
            const dashboard = renderDashboard(customer);
            expect(dashboard.find('#dashboard').length).toEqual(1);
        });

        it('should has customer name', () => {
            const customer = {account: {amount: 0}};
            const dashboard = renderDashboard(customer);
            expect(dashboard.find('.customer-name').length).toEqual(1);
        });

        it('should has customer balance', () => {
            const customer = {account: {amount: 0}};
            const dashboard = renderDashboard(customer);
            expect(dashboard.find('#customer-balance').length).toEqual(1);
        });

        it('should has transaction list', () => {
            const customer = {account: {amount: 0}};
            const dashboard = renderDashboard(customer);
            expect(dashboard.find('#transaction-list').length).toEqual(1);
        });
    });
});
