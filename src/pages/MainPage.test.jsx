import React from 'react';

import { render } from '@testing-library/react';

import MainPage from './MainPage';

describe('MainPage', () => {
  const renderMainPage = () => render(
    <MainPage />,
  );

  it('renders Main Page Title', () => {
    const { container } = renderMainPage();

    expect(container).toHaveTextContent('스터디 목록');
  });
});
