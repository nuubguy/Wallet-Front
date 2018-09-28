import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import DashboardContainer from './DashboardContainer';
import Endpoint from "../Api/Endpoint";
import Customer from "../Utilities/Customer";

describe('DashboardContainer', () => {
    function renderDashboardContainer() {
        return shallow(<DashboardContainer />);
    }

    describe('render', () => {
        it('should has dashboard container component', () => {
            const dashBoardContainer = renderDashboardContainer();
            expect(dashBoardContainer.find('Dashboard').length).toBe(1);
        })
    });

    describe('fetch data', () => {
        it('call axios GET API', async () => {
            let spy = jest.spyOn(mockAxios, "get");

            renderDashboardContainer();

            await Promise.resolve();

            expect(spy).toHaveBeenCalled();
        });

        it('call axios GET API with endpoint', async () => {
            let spy = jest.spyOn(mockAxios, "get");

            renderDashboardContainer();

            await Promise.resolve();

            expect(spy).toHaveBeenCalledWith(Endpoint.getCustomer(Customer.id()));
        });
    });
});
