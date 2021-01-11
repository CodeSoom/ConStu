import React, { useState } from 'react';

import styled from '@emotion/styled';

import StarRatings from 'react-star-ratings';
import palette from '../../styles/palette';

const StudyReviewFormWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  flex-direction: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3rem;
  border: 1px solid ${palette.gray[3]};
  border-radius: 5px;
`;

const StudyReviewFormHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StudyReviewForm = () => {
  const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <StudyReviewFormWrapper>
      <StudyReviewFormHeader>
        <h2>스터디 후기를 작성해주세요!</h2>
        <StarRatings
          rating={rating}
          starRatedColor="#ffc816"
          numberOfStars={5}
          starDimension="40px"
          starSpacing="0"
          starHoverColor="#ffc816"
          changeRating={changeRating}
          name="rating"
        />
      </StudyReviewFormHeader>
      <textarea rows="3" cols="50" />
      <div>
        <button type="button">
          후기 등록하기
        </button>
      </div>
    </StudyReviewFormWrapper>
  );
};

export default StudyReviewForm;
