import React, { useCallback } from 'react';

import StarRatings from 'react-star-ratings';

import styled from '@emotion/styled';

import { useMediaQuery } from 'react-responsive';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

const AverageReviewWrapper = styled.div`
  ${mq({
    padding: ['1rem 0rem', '1.5rem 0 1rem 0'],
  })};

  background-color: ${({ theme }) => theme.reviewColor[3]};
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderTone[3]};
  border-radius: 5px;
`;

const AverageReviewTitle = styled.div`
  ${mq({
    fontSize: ['1.1rem', '1.3rem', '1.6rem'],
  })};

  line-height: 40px;
  color: ${({ theme }) => theme.reviewColor[4]};
  font-weight: bold;

  span {
    ${mq({ fontSize: ['1.3rem', '1.5rem', '1.8rem'] })};
    color: ${palette.teal[5]};
  }
`;

const AverageRatingWrapper = styled.div`
  ${mq({
    flexDirection: ['column', 'row'],
    alignItems: ['center', 'unset'],
    lineHeight: ['25px', '46px'],
  })};

  display: flex;

  em {
    font-style: italic;
    margin-left: .5rem;
  }

  .average-rating {
  ${mq({
    fontSize: ['1.4rem', '1.6rem', '2rem'],
  })};

    font-weight: bold;
    color: ${({ theme }) => theme.reviewColor[4]};
  }

  .total-rating {
  ${mq({
    fontSize: ['.9rem', '1.1rem', '1.5rem'],
  })};

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
  const isMobileScreen = useMediaQuery({ query: '(max-width: 450px)' });

  const averageRating = useCallback(averageReviews(reviews), [reviews]);

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
          starDimension={isMobileScreen ? '32px' : '40px'}
          starSpacing="0"
          name="rating"
        />
        <div>
          <em className="average-rating">
            {convertToRating(averageRating)}
          </em>
          <em className="total-rating">
            / 10.0
          </em>
        </div>
      </AverageRatingWrapper>
    </AverageReviewWrapper>
  );
};

export default AverageReview;
