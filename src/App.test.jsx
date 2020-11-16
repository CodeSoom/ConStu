import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  it('renders App text', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('Hello!');
  });
});
