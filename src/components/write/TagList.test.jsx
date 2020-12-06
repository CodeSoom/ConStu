import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import TagList from './TagList';

describe('TagList', () => {
  const handleRemove = jest.fn();

  beforeEach(() => {
    handleRemove.mockClear();
  });

  const renderTagList = (tags) => render((
    <TagList
      tags={tags}
      onRemove={handleRemove}
    />
  ));

  context('without tags', () => {
    it('nothing renders tags', () => {
      const { container } = renderTagList([]);

      expect(container).not.toHaveTextContent('#JavaScript');
    });
  });

  context('with tags', () => {
    const tags = ['JavaScript', 'React'];

    it('renders tags', () => {
      const { container } = renderTagList(tags);

      tags.forEach((tag) => {
        expect(container).toHaveTextContent(`#${tag}`);
      });
    });

    it('listens click event to remove', () => {
      const { getByText } = renderTagList(tags);

      tags.forEach((tag) => {
        expect(getByText(`#${tag}`)).not.toBeNull();

        fireEvent.click(getByText(`#${tag}`).nextElementSibling);
      });
      expect(handleRemove).toBeCalledTimes(2);
    });
  });
});
