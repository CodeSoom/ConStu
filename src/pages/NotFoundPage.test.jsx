import '../util/__mocks__/matchMedia';

import React from 'react';

import { render } from '@testing-library/react';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  const renderNotFoundPage = () => render((
    <NotFoundPage />
  ));

  describe('Renders NotFound(404) Contents', () => {
    it('should be renders 404 Image and Message Text', () => {
      const { container, getByTestId } = renderNotFoundPage();

      expect(container).toHaveTextContent('아무것도 없어요!');
      expect(container).toHaveTextContent('홈으로');
      expect(getByTestId('not-found-image')).not.toBeNull();
    });
  });
});
