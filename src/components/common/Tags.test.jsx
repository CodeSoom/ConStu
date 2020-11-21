import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import Tags from './Tags';

describe('Tags', () => {
  const renderTags = (tags) => render((
    <MemoryRouter>
      <Tags
        tags={tags}
      />
    </MemoryRouter>
  ));

  context('with tags', () => {
    const tags = ['JavaScript', 'C', 'Python'];
    it('renders tags name', () => {
      const { container } = renderTags(tags);

      tags.forEach((tag) => {
        expect(container).toHaveTextContent(tag);

        expect(container.innerHTML).toContain('<a');
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
