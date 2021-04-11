import React from 'react';

import StarRatings from 'react-star-ratings';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

const AverageReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0 1rem 0;
  border: 1px solid ${palette.gray[3]};
  border-radius: 5px;
`;

const AverageReviewTitle = styled.div`
  line-height: 40px;
  color: ${palette.gray[7]};
  font-size: 1.6rem;
  font-weight: bold;

  span {
    font-size: 1.8rem;
    color: ${palette.teal[5]};
  }
`;

const AverageRatingWrapper = styled.div`
  line-height: 50px;

  em {
    font-style: italic;
    margin-left: .5rem;
  }

  .average-rating {
    font-size: 2rem;
    font-weight: bold;
    color: ${palette.gray[7]};
  }

  .total-rating {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${palette.gray[5]};
  }
`;

const averageReviews = (reviews) => (reviews
  .reduce((acc, { rating }) => acc + rating, 0) / reviews.length).toFixed(1) * 2;

const convertToRating = (rating) => {
  if (Number.isInteger(rating)) {
    return `${rating}.0`;
  }

  return rating;
};

const AverageReview = ({ reviews }) => {
  const averageRating = averageReviews(reviews);

  return (
    <AverageReviewWrapper>
      <AverageReviewTitle>
        스터디를 참여한&nbsp;
        <span>
          {reviews.length}
        </span>
        명의 회원 평균평점
      </AverageReviewTitle>
      <AverageRatingWrapper>
        <StarRatings
          rating={averageRating / 2}
          starRatedColor="#ffc816"
          numberOfStars={5}
          starDimension="40px"
          starSpacing="0"
          name="rating"
        />
        <em className="average-rating">
          {convertToRating(averageRating)}
        </em>
        <em className="total-rating">
          / 10.0
        </em>
      </AverageRatingWrapper>
    </AverageReviewWrapper>
  );
};

export default AverageReview;
