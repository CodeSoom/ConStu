import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import Tags from './Tags';
import MockTheme from './test/MockTheme';

describe('Tags', () => {
  const renderTags = ({ tags = [], type }) => render((
    <MockTheme>
      <MemoryRouter>
        <Tags
          type={type}
          tags={tags}
        />
      </MemoryRouter>
    </MockTheme>
  ));

  context('with tags', () => {
    const tags = ['JavaScript', 'C', 'Python'];
    it('renders tags name', () => {
      const { container } = renderTags({ tags });

      tags.forEach((tag) => {
        expect(container).toHaveTextContent(tag);

        expect(container.innerHTML).toContain('<a');
      });
    });
  });

  context('without tags', () => {
    it('nothing renders tags name', () => {
      const tags = [];

      const { container } = renderTags({ tags });

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('with type introduce', () => {
    const tags = ['JavaScript', 'C', 'Python'];
    const type = 'introduce';

    it('renders tags name', () => {
      const { container } = renderTags({ tags, type });

      tags.forEach((tag) => {
        expect(container).toHaveTextContent(tag);

        expect(container.innerHTML).not.toContain('<a');
      });
    });
  });
});
