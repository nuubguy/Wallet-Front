import React from 'react';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';
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

    describe('fetch data', () => {
        it('should call getAccount and getTransactionList in service', () => {

            let mockGetAccount = jest.fn();
            let mockGetTransaction = jest.fn();
            AccountService.mockImplementation(() =>{
                return{
                    getAccount: mockGetAccount,
                    getTransactionList: mockGetTransaction
                }
            })

            renderDashboardContainer();


            expect(mockGetAccount).toHaveBeenCalled();
            expect(mockGetTransaction).toHaveBeenCalled();
        });
  });
});
