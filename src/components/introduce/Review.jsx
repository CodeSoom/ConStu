import React from 'react';

import Moment from 'react-moment';

import StarRatings from 'react-star-ratings';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

import { changeDateToTime } from '../../util/utils';

const ReviewWrapper = styled.div`
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1rem 0;
  padding: 20px 35px 20px 35px;
  border: 1px solid ${palette.gray[3]};
  border-radius: 5px;
`;

const ReviewContent = styled.div`
  font-size: 1.1rem;
  color: ${palette.gray[8]};
  margin: .7rem 0 .8rem 0;
`;

const ReviewContentInfo = styled.div`
  font-size: 0.9rem;
  color: ${palette.gray[5]};
  display: flex;
  justify-content: space-between;
`;

const Review = ({ review }) => {
  const {
    id, rating, content, createDate,
  } = review;

  return (
    <ReviewWrapper>
      <StarRatings
        rating={rating}
        starRatedColor="#ffc816"
        numberOfStars={5}
        starDimension="20px"
        starSpacing="0"
        starHoverColor="#ffc816"
        name="rating"
        data-testid="star-rating"
      />
      <ReviewContent>
        {content}
      </ReviewContent>
      <ReviewContentInfo>
        <div>
          {id}
        </div>
        <Moment
          interval={0}
          format="YYYY-MM-DD"
        >
          {changeDateToTime(createDate)}
        </Moment>
      </ReviewContentInfo>
    </ReviewWrapper>
  );
};

export default Review;
