import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  function renderLogin() {
    return shallow(<Login />);
  }

  describe('render', () => {
    it('should has one login form', () => {
      const dashboard = renderLogin();
      expect(dashboard.find('#form').length).toEqual(1);
    });

    it('should has input field of username', () => {
      const dashboard = renderLogin();
      expect(dashboard.find('#username').length).toEqual(1);
    });

    it('should has input field of password', () => {
      const dashboard = renderLogin();
      expect(dashboard.find('#password').length).toEqual(1);
    });
  });
});
