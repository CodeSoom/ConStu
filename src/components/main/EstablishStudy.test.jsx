import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import EstablishStudy from './EstablishStudy';

describe('EstablishStudy', () => {
  const renderEstablishStudy = (isMobile) => render((
    <MemoryRouter>
      <EstablishStudy
        isMobile={isMobile}
      />
    </MemoryRouter>
  ));

  context('When desktop screen', () => {
    it('renders "스터디 개설하기" button', () => {
      const { container } = renderEstablishStudy(false);

      expect(container).toHaveTextContent('스터디 개설하기');
    });
  });

  context('When mobile screen', () => {
    it('renders "+" button', () => {
      const { getByTestId, container } = renderEstablishStudy(true);

      expect(container.innerHTML).toContain('<a');
      expect(getByTestId('plus-icon')).not.toBeNull();
    });
  });
});
