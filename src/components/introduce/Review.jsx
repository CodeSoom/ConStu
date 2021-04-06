import React from 'react';

import styled from '@emotion/styled';

const ReviewWrapper = styled.div`

`;

const Review = ({ review }) => {
  const {
    id, rating, content, createdDate,
  } = review;

  return (
    <ReviewWrapper>
      <div>
        {rating}
      </div>
      <div>
        {content}
      </div>
      <div>
        {`${id} | ${createdDate}`}
      </div>
    </ReviewWrapper>
  );
};

export default Review;
