import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import RegisterPage from './RegisterPage';
import MockTheme from '../components/common/test/MockTheme';

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
    <MockTheme>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </MockTheme>
  ));

  describe('renders Register page text contents', () => {
    it('renders Register page Title', () => {
      const { container } = renderRegisterPage();

      expect(container).toHaveTextContent('회원가입');
    });
  });
});
