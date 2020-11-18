import React from 'react';

import { render } from '@testing-library/react';

import Tags from './Tags';

describe('Tags', () => {
  const renderTags = (tags) => render((
    <Tags
      tags={tags}
    />
  ));

  context('with tags', () => {
    it('renders tags name', () => {
      const tags = ['JavaScript', 'C', 'Python'];

      const { container } = renderTags(tags);

      tags.forEach((tag) => {
        expect(container).toHaveTextContent(tag);
      });
    });
  });

  context('without tags', () => {
    it('nothing renders tags name', () => {
      const tags = [];

      const { container } = renderTags(tags);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
