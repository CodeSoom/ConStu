import React from 'react';

import Review from './Review';

const ReviewList = ({ reviews }) => (
  <>
    {reviews.map((review) => (
      <Review
        key={review.id}
        review={review}
      />
    ))}
  </>
);

export default ReviewList;
