import React from 'react';

import { render } from '@testing-library/react';

import TagItem from './TagItem';

describe('TagItem', () => {
  const handleRemove = jest.fn();

  const renderTagItem = (tag) => render((
    <TagItem
      tag={tag}
      onClick={handleRemove}
    />
  ));

  const tag = 'JavaScript';

  describe('render Tag Item contents text', () => {
    it('renders tag text', () => {
      const { container } = renderTagItem(tag);

      expect(container).toHaveTextContent('#JavaScript');
    });
  });
});
