import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Review from './Review';
import MockTheme from '../common/test/MockTheme';

describe('Review', () => {
  const mockReview = {
    id: 'test@test.com',
    rating: 3,
    content: 'review',
    createDate: new Date(),
  };

  const handleClick = jest.fn();

  const renderReview = (review) => render((
    <MockTheme>
      <Review
        user={given.user}
        review={review}
        onClick={handleClick}
      />
    </MockTheme>
  ));

  context("When it's my review", () => {
    given('user', () => ('test@test.com'));

    it('Render review contents', () => {
      const { container, getByTestId } = renderReview(mockReview);

      expect(container).toHaveTextContent('review');
      expect(container).toHaveTextContent('test@test.com');
      expect(getByTestId('close-icon')).not.toBeNull();
    });

    it('Listen delete click events', () => {
      const { getByTestId } = renderReview(mockReview);

      fireEvent.click(getByTestId('close-icon'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });

  context("When it's my review", () => {
    given('user', () => ('test'));

    it('Render review contents', () => {
      const { container } = renderReview(mockReview);

      expect(container).toHaveTextContent('review');
      expect(container).toHaveTextContent('test@test.com');
    });
  });
});
