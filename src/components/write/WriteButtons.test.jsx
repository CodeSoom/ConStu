import React from 'react';

import { render } from '@testing-library/react';

import WriteButtons from './WriteButtons';

describe('WriteButtons', () => {
  const renderWriteButtons = (error) => render((
    <WriteButtons error={error} />
  ));

  it('render Write buttons', () => {
    const { container } = renderWriteButtons();

    expect(container).toHaveTextContent('등록하기');
    expect(container).toHaveTextContent('취소');
  });

  context('with error message', () => {
    const error = 'error';
    it('renders error message', () => {
      const { container } = renderWriteButtons(error);

      expect(container).toHaveTextContent(error);
    });
  });

  context('without error message', () => {
    it("doesn't renders error message", () => {
      const { container } = renderWriteButtons();

      expect(container).not.toHaveTextContent('error');
    });
  });
});
