import React from 'react';

import _ from 'lodash';

import Review from './Review';

const ReviewList = ({ reviews }) => {
  if (_.isEmpty(reviews)) {
    return (
      <div>아직 리뷰가 존재하지 않습니다!</div>
    );
  }

  return (
    <>
      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
        />
      ))}
    </>
  );
};

export default ReviewList;
