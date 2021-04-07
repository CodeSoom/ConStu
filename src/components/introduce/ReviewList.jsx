import React from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';

import Review from './Review';

const ReviewWrapper = styled.div`
  margin-bottom: 3rem;
`;

const ReviewList = ({ reviews }) => {
  if (_.isEmpty(reviews)) {
    return (
      <div>아직 리뷰가 존재하지 않습니다!</div>
    );
  }

  return (
    <ReviewWrapper>
      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
        />
      ))}
    </ReviewWrapper>
  );
};

export default ReviewList;
