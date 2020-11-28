import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  const renderHeader = () => render((
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ));

  it('renders Header text', () => {
    const { container } = renderHeader();

    expect(container).toHaveTextContent('제목(미정)');
    expect(container).toHaveTextContent('로그인');
    expect(container).toHaveTextContent('회원가입');
  });
});
