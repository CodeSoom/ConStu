import React from 'react';

import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  const renderHeader = () => render(
    <Header />,
  );

  it('renders Header Title', () => {
    const { container } = renderHeader();

    expect(container).toHaveTextContent('헤더');
  });
});
