import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import RegisterPage from './RegisterPage';
import InjectMockProviders from '../components/common/test/InjectMockProviders';

describe('RegisterPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        register: {
          userEmail: '',
          password: '',
          passwordConfirm: '',
        },
      },
    }));
  });

  const renderRegisterPage = () => render((
    <InjectMockProviders>
      <RegisterPage />
    </InjectMockProviders>
  ));

  describe('renders Register page text contents', () => {
    it('renders Register page Title', () => {
      const { container } = renderRegisterPage();

      expect(container).toHaveTextContent('회원가입');
    });
  });
});
