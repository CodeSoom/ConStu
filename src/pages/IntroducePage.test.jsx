import React from 'react';

import { render } from '@testing-library/react';

import IntroducePage from './IntroducePage';

describe('IntroducePage', () => {
  const renderIntroducePage = () => render(
    <IntroducePage />,
  );

  it('renders Introduce Title', () => {
    const { container } = renderIntroducePage();

    expect(container).toHaveTextContent('스터디 소개');
  });
});
