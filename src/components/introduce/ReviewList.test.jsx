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

  context('With reviews', () => {
    it('Render reviews', () => {
      const { container } = renderReviewList(mockReviews);

      expect(container).toHaveTextContent('review');
      expect(container).toHaveTextContent('test@test.com');
    });
  });

  context('Without reviews', () => {
    it('Render nothing review message', () => {
      const { container } = renderReviewList([]);

      expect(container).toHaveTextContent('아직 리뷰가 존재하지 않습니다!');
    });
  });
});
