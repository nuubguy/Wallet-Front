import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import DashboardContainer from './DashboardContainer';
import Endpoint from "../Api/Endpoint";
import Customer from "../Utilities/Constant";
import AccountService from "../Api/AccountService";

jest.mock('../Api/AccountService');

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

    // describe('fetch data', () => {
    //     it('call axios GET API', () => {
    //         //let spy = jest.spyOn(mockAxios, "get");
    //         let mockGetAccount = jest.fn();
    //         let mockGetTransaction = jest.fn();
    //         AccountService.mockImplementation({
    //             getAccount: mockGetAccount,
    //             getTransactionList: mockGetTransaction
    //         })
    //
    //         renderDashboardContainer();
    //
    //         //await Promise.resolve();
    //
    //         expect(mockGetAccount).toHaveBeenCalled();
    //         expect(mockGetTransaction).toHavebeenCalled();
    //     });
    //
    //     it('call axios GET API with endpoint', async () => {
    //         let spy = jest.spyOn(mockAxios, "get");
    //
    //         renderDashboardContainer();
    //
    //         await Promise.resolve();
    //
    //         expect(spy).toHaveBeenCalledWith(Endpoint.getCustomer(Customer.id()));
    //     });
    // });
});
