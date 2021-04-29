import React from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import Review from './Review';
import AverageReview from './AverageReview';

const ReviewWrapper = styled.div`
  ${mq({
    margin: ['1rem 0 2rem 0', '2rem 0 3rem 0'],
  })};
`;

const EmptyReviewWrapper = styled.div`
  ${mq({
    fontSize: ['1rem', '1.1rem'],
    fontWeight: ['lighter', 'bold'],
    padding: ['35px', '45px'],
    margin: ['1rem 0 2rem 0', '2rem 0 3rem 0'],
  })};

  background-color: #f8f8f8;
  color: ${palette.gray[6]};
  display: flex;
  align-items: center;
  flex-direction: column;
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
