import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  const renderHeader = (user) => render((
    <MemoryRouter>
      <Header user={user} />
    </MemoryRouter>
  ));

  context('with user', () => {
    const user = 'seungmin@naver.com';

    it('renders Header text', () => {
      const { container } = renderHeader(user);

      expect(container).toHaveTextContent('로그아웃');
      expect(container).toHaveTextContent(user);
    });
  });

  context('without user', () => {
    it('renders Header text', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('로그인');
      expect(container).toHaveTextContent('회원가입');
    });
  });
});
