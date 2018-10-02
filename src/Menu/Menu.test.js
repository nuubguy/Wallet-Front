import React from 'react';
import { shallow } from 'enzyme';
import Menu from "./Menu";

describe('Menu', () => {
    function renderMenu() {
        return shallow(<Menu  />);
    }

    describe('render', () => {
        it('should has four menu', () => {
            const menu = renderMenu();
            expect(menu.find('li').length).toEqual(4);
        });

        it('should has two routes', () => {
            const menu = renderMenu();
           expect(menu.find('Route').length).toEqual(3);
        });

        it('should has dashboard route', () => {
            const menu = renderMenu();
            const route = menu.find('Route');

            expect(route.at(0).props().path).toEqual('/dashboard');
        });

        it('should has transaction route', () => {
            const menu = renderMenu();
            const route = menu.find('Route');

            expect(route.at(1).props().path).toEqual('/transaction');
        });

        it('should contains transfer route', () => {
            const menu = renderMenu();
            const route = menu.find('Route');

            expect(route.at(2).props().path).toBe('/transfer');
        });
    });
});
