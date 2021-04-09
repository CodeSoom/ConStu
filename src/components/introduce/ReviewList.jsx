import React from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

import Review from './Review';
import AverageReview from './AverageReview';

const ReviewWrapper = styled.div`
  margin: 2rem 0 3rem 0;
`;

const EmptyReviewWrapper = styled.div`
  background-color: #f8f8f8;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${palette.gray[6]};
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 2rem 0 3rem 0;
  padding: 45px;
  border: 1px solid ${palette.gray[3]};
  border-radius: 5px;
`;

const ReviewList = ({ user, reviews, onDelete }) => {
  if (_.isEmpty(reviews)) {
    return (
      <EmptyReviewWrapper>
        등록된 후기가 존재하지 않습니다!
      </EmptyReviewWrapper>
    );
  }

  return (
    <ReviewWrapper>
      <AverageReview
        reviews={reviews}
      />
      {reviews.map((review) => (
        <Review
          key={review.id}
          user={user}
          review={review}
          onClick={onDelete}
        />
      ))}
    </ReviewWrapper>
  );
};

export default ReviewList;
