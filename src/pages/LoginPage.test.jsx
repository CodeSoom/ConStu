import React from 'react';

import { render } from '@testing-library/react';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  const renderLoginPage = () => render((
    <LoginPage />
  ));

  describe('renders Login page text contents', () => {
    it('renders Login page Title', () => {
      const { container } = renderLoginPage();

      expect(container).toHaveTextContent('Login');
    });
  });
});
