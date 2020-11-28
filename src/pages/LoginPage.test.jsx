import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      login: {
        userEmail: '',
        password: '',
      },
    }));
  });

  const renderLoginPage = () => render((
    <LoginPage />
  ));

  describe('renders Login page text contents', () => {
    it('renders Login page Title', () => {
      const { container } = renderLoginPage();

      expect(container).toHaveTextContent('로그인');
    });
  });
});
