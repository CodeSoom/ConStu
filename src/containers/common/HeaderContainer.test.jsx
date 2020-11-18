import React from 'react';

import { render } from '@testing-library/react';

import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  const renderHeaderContainer = () => render(
    <HeaderContainer />,
  );

  it('renders Header Title', () => {
    const { container } = renderHeaderContainer();

    expect(container).toHaveTextContent('헤더');
  });
});
