import React from 'react';

import { render } from '@testing-library/react';

import ReviewList from './ReviewList';

describe('ReviewList', () => {
  const mockReviews = [{
    id: 'test@test.com',
    rating: 3,
    content: 'review',
    createdDate: new Date(),
  }];

  const renderReviewList = (reviews) => render((
    <ReviewList
      reviews={reviews}
    />
  ));

  it('Render reviews', () => {
    const { container } = renderReviewList(mockReviews);

    expect(container).toHaveTextContent('review');
    expect(container).toHaveTextContent('test@test.com');
    expect(container).toHaveTextContent(3);
  });
});
