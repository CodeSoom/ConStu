import React from 'react';

import { render } from '@testing-library/react';

import WriteEditor from './WriteEditor';

describe('WriteEditor', () => {
  const handleChange = jest.fn();
  const renderWriteButtons = () => render((
    <WriteEditor
      onChange={handleChange}
    />
  ));

  it('render Write Editor', () => {
    const { container } = renderWriteButtons();

    expect(container).toHaveTextContent('내용을 작성해주세요.');
  });
});
