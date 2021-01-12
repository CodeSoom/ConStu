import React, { useState } from 'react';

import styled from '@emotion/styled';

import StarRatings from 'react-star-ratings';

import palette from '../../styles/palette';
import Textarea from '../../styles/Textarea';
import Button from '../../styles/Button';

const StudyReviewFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0 3rem 0;
  padding: 20px 0 20px 0;
  border: 1px solid ${palette.gray[3]};
  border-radius: 5px;
  background-color: #f8f8f8;
`;

const StudyReviewFormHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 0 0.5rem 0;

  h2 {
    margin: 0 0 0.3rem 0;
  }
`;

const StudyReviewFormBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StudyReviewFormButton = styled(Button)`
  margin: 1px 0 0.8rem 0.5rem;
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
          starDimension="35px"
          starSpacing="0"
          starHoverColor="#ffc816"
          changeRating={changeRating}
          name="rating"
        />
      </StudyReviewFormHeader>
      <StudyReviewFormBody>
        <Textarea
          rows="3"
          cols="100"
          placeholder="후기를 입력해주세요!"
        />
        <StudyReviewFormButton success>
          후기 등록하기
        </StudyReviewFormButton>
      </StudyReviewFormBody>
    </StudyReviewFormWrapper>
  );
};

export default StudyReviewForm;
