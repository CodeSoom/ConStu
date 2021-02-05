import React from 'react';

import styled from '@emotion/styled';

import StarRatings from 'react-star-ratings';

import { STUDY_REVIEW_FORM } from '../../util/constants/constants';
import { changeDateToTime, isCheckedTimeStatus } from '../../util/utils';

import palette from '../../styles/palette';
import Textarea from '../../styles/Textarea';
import Button from '../../styles/Button';

const { FORM_TITLE, REVIEW_SUBMIT } = STUDY_REVIEW_FORM;

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

const isValidateUserInfo = (user) => (participants) => !!participants
  .find(({ id, confirm }) => id === user && confirm && confirm === true);

const StudyReviewForm = ({
  group, user, time, fields, onChangeReview, onSubmit,
}) => {
  const {
    participants, personnel, applyEndDate,
  } = group;

  const { rating, review } = fields;

  const applyEndTime = changeDateToTime(applyEndDate);

  const valid = {
    time, applyEndTime, participants, personnel,
  };

  if (!isValidateUserInfo(user)(participants) || !isCheckedTimeStatus(valid)) {
    return null;
  }

  const handleChangeRating = (newRating, name) => {
    onChangeReview({
      name,
      value: newRating,
    });
  };

  const handleChangeReview = (event) => {
    const { name, value } = event.target;

    onChangeReview({
      name,
      value,
    });
  };

  return (
    <StudyReviewFormWrapper>
      <StudyReviewFormHeader>
        <h2>{FORM_TITLE}</h2>
        <StarRatings
          rating={rating}
          starRatedColor="#ffc816"
          numberOfStars={5}
          starDimension="35px"
          starSpacing="0"
          starHoverColor="#ffc816"
          changeRating={handleChangeRating}
          name="rating"
        />
      </StudyReviewFormHeader>
      <StudyReviewFormBody>
        <Textarea
          rows="3"
          cols="100"
          name="review"
          value={review}
          placeholder="후기를 입력해주세요!"
          onChange={handleChangeReview}
        />
        <StudyReviewFormButton
          success
          onClick={onSubmit}
        >
          {REVIEW_SUBMIT}
        </StudyReviewFormButton>
      </StudyReviewFormBody>
    </StudyReviewFormWrapper>
  );
};

export default StudyReviewForm;
