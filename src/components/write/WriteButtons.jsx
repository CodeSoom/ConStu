import React, { useEffect, useState } from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import sanitize from 'sanitize-html';

import { BUTTON_NAME } from '../../util/constants/constants';
import { ERROR_MESSAGE, FIREBASE_GROUP_ERROR_MESSAGE } from '../../util/constants/messages';

import Button from '../../styles/Button';
import palette from '../../styles/palette';

const {
  NO_TAG,
  FAST_APPLY_DEADLINE,
  NO_CONTENTS, NO_TITLE,
  NO_APPLY_DATE,
  ERROR_PERSONNEL,
  FAILURE_OPEN_STUDY,
  FAILURE_EDIT_STUDY,
} = ERROR_MESSAGE;
const { CANCEL } = BUTTON_NAME;

const WriteButtonsWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;

  ${(props) => props.error && css`
    margin-top: 2rem;
  `};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ErrorWrapper = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-top: 2rem;
  color: ${palette.warn[2]};
`;

const CancelButton = styled(Button)`
  padding: 0.45rem 1rem;
  background: white;
  color: ${palette.warn[1]};
  
  &:hover {
    color: white;
    background: ${palette.warn[1]};
  }
`;

const SubmitButton = styled(Button)`
  padding: 0.45rem 5rem;
`;

const isCheckApplyEndDate = (applyDate) => Date.now() - applyDate >= 0;
const removeHtml = (body) => sanitize(body, { allowedTags: [] }).trim();
const isCheckPersonnel = (personnel) => !Number.isInteger(personnel) || personnel < 1;

const WriteButtons = ({
  fields, onSubmit, onCancel, isEdit, groupError,
}) => {
  const [error, setError] = useState(null);

  const {
    title, applyEndDate, personnel, contents, tags,
  } = fields;

  const applyEndTime = new Date(applyEndDate).getTime();

  const handleSubmit = () => {
    if (!title.trim()) {
      setError(NO_TITLE);
      return;
    }

    if (!applyEndDate.trim()) {
      setError(NO_APPLY_DATE);
      return;
    }

    if (isCheckApplyEndDate(applyEndTime)) {
      setError(FAST_APPLY_DEADLINE);
      return;
    }

    if (isCheckPersonnel(parseInt(personnel, 10))) {
      setError(ERROR_PERSONNEL);
      return;
    }

    if (!removeHtml(contents)) {
      setError(NO_CONTENTS);
      return;
    }

    if (_.isEmpty(tags)) {
      setError(NO_TAG);
      return;
    }

    onSubmit();
  };

  useEffect(() => {
    if (groupError) {
      setError(
        FIREBASE_GROUP_ERROR_MESSAGE[groupError]
        || (isEdit ? FAILURE_EDIT_STUDY : FAILURE_OPEN_STUDY),
      );
    }
  }, [groupError]);

  return (
    <>
      {error && (
        <ErrorWrapper>{error}</ErrorWrapper>
      )}
      <WriteButtonsWrapper error={error}>
        <ButtonWrapper>
          <SubmitButton
            success
            type="button"
            onClick={handleSubmit}
          >
            {isEdit ? '수정하기' : '등록하기'}
          </SubmitButton>
          <CancelButton
            warn
            type="button"
            onClick={onCancel}
          >
            {CANCEL}
          </CancelButton>
        </ButtonWrapper>
      </WriteButtonsWrapper>
    </>
  );
};

export default WriteButtons;
