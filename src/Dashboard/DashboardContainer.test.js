import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import DashboardContainer from './DashboardContainer';
import Endpoint from "../Api/Endpoint";
import Customer from "../Utilities/Customer";

describe('DashboardContainer', () => {
    function setup() {
        return shallow(<DashboardContainer />);
    }

    describe('render', () => {
        it('render without crashing', () => {
            setup();
        });

        it('should has dashboard container component', () => {
            expect(setup().find('Dashboard').length).toBe(1);
        })
    });

    describe('fetch data', () => {
        it('call axios GET API', async () => {
            let spy = jest.spyOn(mockAxios, "get");

            setup();

            await Promise.resolve();

            expect(spy).toHaveBeenCalled();
        });

        it('call axios GET API with endpoint', async () => {
            let spy = jest.spyOn(mockAxios, "get");

            setup();

            await Promise.resolve();

            expect(spy).toHaveBeenCalledWith(Endpoint.getCustomer(Customer.id()));
        });
    });
});
