import React from 'react';

import { render } from '@testing-library/react';

import RegisterPage from './RegisterPage';

describe('RegisterPage', () => {
  const renderRegisterPage = () => render((
    <RegisterPage />
  ));

  describe('renders Register page text contents', () => {
    it('renders Register page Title', () => {
      const { container } = renderRegisterPage();

      expect(container).toHaveTextContent('Register');
    });
  });
});
