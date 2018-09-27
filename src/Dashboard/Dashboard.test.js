import React from 'react';
import {shallow} from 'enzyme';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
    function setup() {
        return shallow(<Dashboard customer={{}} />);
    }

    describe('render', () => {
        it('should has one div', () => {
            const render = setup();
            expect(render.find('div').length).toEqual(1);
        });

        it('should has customer name', () => {
            const render = setup();
            expect(render.find('#customer-name').length).toEqual(1);
        });

        it('should has customer balance', () => {
            const render = setup();
            expect(render.find('#customer-balance').length).toEqual(1);
        });
    });
});
