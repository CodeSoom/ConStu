import React from 'react';

import { render } from '@testing-library/react';

import IntroduceActionButtons from './IntroduceActionButtons';

describe('IntroduceActionButtons', () => {
  const renderIntroduceActionButtons = () => render((
    <IntroduceActionButtons />
  ));

  it('renders revise button and delete button', () => {
    const { container } = renderIntroduceActionButtons();

    expect(container).toHaveTextContent('수정');
    expect(container).toHaveTextContent('삭제');
  });
});
