import React from 'react';

import { useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import PrivateRoute from './PrivateRoute';

jest.mock('react-redux');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: jest.fn(({ to: { pathname } }) => (`Redirected to ${pathname}`)),
}));

describe('PrivateRoute', () => {
  const renderPrivateRoute = ({ component }) => render((
    <MemoryRouter>
      <PrivateRoute
        component={component}
      />
    </MemoryRouter>
  ));

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
    }));
  });

  context('with user', () => {
    given('user', () => 'mockUser');
    const MockComponent = () => (
      <h1>정상입니다!</h1>
    );

    it('renders component TextContent "정상입니다!"', () => {
      const { container } = renderPrivateRoute({
        component: MockComponent,
      });

      expect(container).toHaveTextContent('정상입니다');
    });
  });

  context('without user', () => {
    given('user', () => null);
    const MockComponent = () => (
      <h1>실패입니다!</h1>
    );

    it('redirect to "/login"', () => {
      const { container } = renderPrivateRoute({
        component: MockComponent,
      });

      expect(container).toHaveTextContent('Redirected to /login');
    });
  });
});
