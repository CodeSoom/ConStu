import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      register: {
        userEmail: '',
        password: '',
        passwordConfirm: '',
      },
    }));
  });

  const renderRegisterPage = () => render((
    <RegisterPage />
  ));

  describe('renders Register page text contents', () => {
    it('renders Register page Title', () => {
      const { container } = renderRegisterPage();

      expect(container).toHaveTextContent('회원가입');
    });
  });
});
