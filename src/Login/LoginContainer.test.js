import React from 'react';
import { shallow } from 'enzyme';
import LoginContainer from './LoginContainer';

describe('LoginContainer', () => {
  function renderLoginContainer() {
    return shallow(<LoginContainer />);
  }

  describe('render', () => {
    it('should has a login component', () => {
      const render = renderLoginContainer();
      expect(render.find('Login').length).toEqual(1);
    });
  });

  describe('input of username changes', () => {
    it('should update state', () => {
      const render = renderLoginContainer();
      render.instance().onChangeUsername('kimi');

      expect(render.state().username).toEqual('kimi');
    });
  });

  describe('input of password changes', () => {
    it('should update state', () => {
      const render = renderLoginContainer();
      render.instance().onChangePassword('p@ssw0rd');

      expect(render.state().password).toEqual('p@ssw0rd');
    });
  });
});
