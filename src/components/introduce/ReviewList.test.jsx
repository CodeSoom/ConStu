import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ReviewList from './ReviewList';
import MockTheme from '../common/test/MockTheme';

describe('ReviewList', () => {
  const mockReviews = [{
    id: 'test@test.com',
    rating: 3,
    content: 'review',
    createdDate: new Date(),
  }];

  const handleClick = jest.fn();

  const renderReviewList = (reviews) => render((
    <MockTheme>
      <ReviewList
        user="test@test.com"
        reviews={reviews}
        onDelete={handleClick}
      />
    </MockTheme>
  ));

  context('With reviews', () => {
    it('Render reviews', () => {
      const { container } = renderReviewList(mockReviews);

      expect(container).toHaveTextContent('스터디를 참여한 1명의 회원 평균평점');
      expect(container).toHaveTextContent('6.0');
      expect(container).toHaveTextContent('review');
      expect(container).toHaveTextContent('test@test.com');
    });

    it('Listen delete click events', () => {
      const { getByTestId } = renderReviewList(mockReviews);

      fireEvent.click(getByTestId('close-icon'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });

  context('Without reviews', () => {
    it('Render nothing review message', () => {
      const { container } = renderReviewList([]);

      expect(container).toHaveTextContent('등록된 후기가 존재하지 않습니다!');
    });
  });
});
