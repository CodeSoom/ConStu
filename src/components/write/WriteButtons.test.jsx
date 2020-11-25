import React from 'react';

import { render } from '@testing-library/react';

import WriteButtons from './WriteButtons';

describe('WriteButtons', () => {
  const renderWriteButtons = () => render((
    <WriteButtons />
  ));

  it('render Write buttons', () => {
    const { container } = renderWriteButtons();

    expect(container).toHaveTextContent('등록하기');
    expect(container).toHaveTextContent('취소');
  });
});
