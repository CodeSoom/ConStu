import React from 'react';

import Moment from 'react-moment';

import StarRatings from 'react-star-ratings';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import { changeDateToTime } from '../../util/utils';

import CloseSvg from '../../assets/icons/close.svg';

const ReviewWrapper = styled.div`
  ${mq({
    padding: ['20px', '20px 35px 20px 35px'],
  })};

  background-color: ${({ theme }) => theme.reviewColor[0]};
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1rem 0;
  border: 1px solid ${({ theme }) => theme.borderTone[4]};
  border-radius: 5px;
`;

const ReviewContent = styled.p`
  ${mq({
    fontSize: ['.9rem', '1rem', '1.1rem'],
  })};

  font-family: 'Nanum Gothic', sans-serif;
  line-height: 21px;
  word-break: keep-all;
  overflow-wrap: break-word;
  color: ${({ theme }) => theme.reviewColor[1]};
  margin: .7rem 0 .8rem 0;
`;

const ReviewContentInfo = styled.div`
  font-size: 0.9rem;
  color: ${palette.gray[5]};
  display: flex;
  justify-content: space-between;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseIcon = styled(CloseSvg)`
  cursor: pointer;
  width: 20px;
  height: 20px;
  fill: ${palette.gray[6]};
  transition: fill .2s;
  
  &:hover {
    fill: ${palette.gray[8]};
  }
`;

const Review = ({ user, review, onClick }) => {
  const {
    id, rating, content, createDate,
  } = review;

  return (
    <ReviewWrapper>
      <ReviewHeader>
        <StarRatings
          rating={rating}
          starRatedColor="#ffc816"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="0"
        />
        {user === id && (
          <CloseIcon
            data-testid="close-icon"
            onClick={() => onClick(id)}
          />
        )}
      </ReviewHeader>
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
