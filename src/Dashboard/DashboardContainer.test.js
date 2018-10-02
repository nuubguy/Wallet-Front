import React from 'react';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';

jest.mock('../Api/AccountService');

describe('DashboardContainer', () => {
    function renderDashboardContainer(customer, transaction) {
        return shallow(<DashboardContainer customer={customer} transaction={transaction}/>);
    }

    describe('render', () => {
        it('should has dashboard container component', () => {
            const dashBoardContainer = renderDashboardContainer({},{});
            expect(dashBoardContainer.find('Dashboard').length).toBe(1);
        })
    });
});
