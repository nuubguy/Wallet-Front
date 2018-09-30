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
           expect(menu.find('Route').length).toEqual(2);
        });

        it('should has dashboard route', () => {
            const menu = renderMenu();
            const routes = menu.find('Route');

            expect(routes.at(0).props().path).toEqual('/dashboard');
        });

        it('should has transaction route', () => {
            const menu = renderMenu();
            const routes = menu.find('Route');

            expect(routes.at(1).props().path).toEqual('/transaction');
        });
    });
});
