import React from 'react';

import { render } from '@testing-library/react';

import Review from './Review';

describe('Review', () => {
  const mockReview = {
    id: 'test@test.com',
    rating: 3,
    content: 'review',
    createDate: new Date(),
  };

  const renderReview = (review) => render((
    <Review
      review={review}
    />
  ));

  it('Render review contents', () => {
    const { container } = renderReview(mockReview);

    expect(container).toHaveTextContent('review');
    expect(container).toHaveTextContent(3);
    expect(container).toHaveTextContent('test@test.com');
  });
});
