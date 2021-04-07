import React from 'react';

import { render } from '@testing-library/react';

import AverageReview from './AverageReview';

describe('AverageReview', () => {
  const renderAverageReview = (reviews) => render((
    <AverageReview
      reviews={reviews}
    />
  ));

  context('When the average rating is integer', () => {
    const reviews = [
      { rating: 3 },
      { rating: 3 },
    ];
    it('Renders average reviews contents', () => {
      const { container } = renderAverageReview(reviews);

      expect(container).toHaveTextContent(`스터디를 참여한 ${reviews.length}명의 회원 평균평점`);
      expect(container).toHaveTextContent(6.0);
    });
  });

  context("When the average rating isn't integer", () => {
    const reviews = [
      { rating: 3 },
      { rating: 4 },
      { rating: 4 },
    ];
    it('Renders average reviews contents', () => {
      const { container } = renderAverageReview(reviews);

      expect(container).toHaveTextContent(`스터디를 참여한 ${reviews.length}명의 회원 평균평점`);
      expect(container).toHaveTextContent(7.4);
    });
  });
});
