import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  const renderHeaderContainer = () => render((
    <MemoryRouter>
      <HeaderContainer />
    </MemoryRouter>
  ));

  it('renders Header Title', () => {
    const { container } = renderHeaderContainer();

    expect(container).toHaveTextContent('제목(미정)');
  });
});
