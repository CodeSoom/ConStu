import React from 'react';

import styled from '@emotion/styled';

const ReviewWrapper = styled.div`

`;

const Review = ({ review }) => {
  const {
    id, rating, content, createDate,
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
        {`${id} | ${createDate}`}
      </div>
    </ReviewWrapper>
  );
};

export default Review;
