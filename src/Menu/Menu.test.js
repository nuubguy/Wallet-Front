import React from 'react';
import { shallow } from 'enzyme';
import Menu from "./Menu";

describe('Menu', () => {
    describe('render', () => {
        it('should has 2 menu', () => {
            const render = shallow(<Menu  />);
            expect(render.find('li').length).toEqual(2);
        });

        it('should has 2 routes', () => {
           const render = shallow(<Menu />);
           expect(render.find('Route').length).toEqual(2);
        });

        it('should has dashboard route', () => {
            const render = shallow(<Menu />);
            const routes = render.find('Route');

            expect(routes.at(0).props().path).toEqual('/dashboard');
        });

        it('should has transaction route', () => {
            const render = shallow(<Menu />);
            const routes = render.find('Route');

            expect(routes.at(1).props().path).toEqual('/transaction');
        });
    });
});
