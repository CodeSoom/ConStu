import React, { useState, useCallback } from 'react';

import _ from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { APPLY_FORM_TITLE, BUTTON_NAME } from '../../../util/constants/constants';

import mq from '../../../styles/responsive';
import palette from '../../../styles/palette';

import Button from '../../../styles/Button';
import Textarea from '../../../styles/Textarea';
import BooksSvg from '../../../assets/icons/books.svg';

const { WANT_TO_GET, APPLY_REASON } = APPLY_FORM_TITLE;
const { CONFIRM, CANCEL } = BUTTON_NAME;

const ApplicationFormModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 101;
  background: rgba(0, 0, 0, 0.25);

  ${(props) => props.visible && css`
    &.animation {
      animation-name: fade-in;
      animation-duration: 0.3s;
      animation-fill-mode: both;
    }
  
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
          opacity: 1;
      }
    }
  `};
`;

const ModalBoxWrapper = styled.div`
  ${mq({
    width: ['300px', '400px'],
    height: ['540px', '575px'],
  })};

  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  background: ${({ theme }) => theme.subBaseTone[0]};

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const HeaderWrapper = styled.div`
  ${mq({
    marginBottom: ['1rem', '2rem'],
  })};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  h2 {
    ${mq({ fontSize: ['1.5rem', '1.8rem'] })};

    padding-left: .5rem;
    padding-top: .4rem;
  }
`;

const ContentBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.2rem;

  label {
    ${mq({ fontSize: ['1rem', '1.2rem'] })};

    margin-bottom: 0.5rem;

    ::before {
      ${mq({ fontSize: ['1rem', '1.25rem'] })};

      content: '*';
      font-weight: 400;
      display: inline-block;
      vertical-align: super;
      line-height: 1.25rem;
      margin: 0 0.125rem 0 0;
      color: ${palette.warn[2]};
    }
  }
`;

const StyledButton = styled(Button)`
  &:last-of-type {
    margin-left: .7rem;
  }
`;

const BooksIcon = styled(BooksSvg)`
  ${mq({
    width: ['21px', '25px'],
    height: ['21px', '25px'],
  })};
`;

const ApplicationFormModal = ({
  visible, onCancel, onConfirm, onChangeApply, fields,
}) => {
  const [error, setError] = useState(null);

  const { reason, wantToGet } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError(null);
    onChangeApply({ name, value });
  };

  const handleCancel = () => {
    setError(null);
    onCancel();
  };

  const handleConfirm = useCallback(() => {
    if (!_.trim(reason)) {
      setError('reason');
      return;
    }

    if (!_.trim(wantToGet)) {
      setError('wantToGet');
      return;
    }

    setError(null);
    onConfirm();
  }, [reason, wantToGet, onConfirm]);

  if (!visible) {
    return null;
  }

  return (
    <ApplicationFormModalWrapper visible className="animation">
      <ModalBoxWrapper>
        <HeaderWrapper>
          <BooksIcon />
          <h2>
            스터디 참여 신청서
          </h2>
        </HeaderWrapper>
        <ContentBoxWrapper>
          <label htmlFor="apply-reason">{APPLY_REASON}</label>
          <Textarea
            error={error && error === 'reason'}
            rows="10"
            id="apply-reason"
            name="reason"
            placeholder="내용을 입력해주세요."
            value={reason}
            onChange={handleChange}
          />
        </ContentBoxWrapper>
        <ContentBoxWrapper>
          <label htmlFor="study-want">{WANT_TO_GET}</label>
          <Textarea
            error={error && error === 'wantToGet'}
            rows="10"
            id="study-want"
            name="wantToGet"
            placeholder="내용을 입력해주세요."
            value={wantToGet}
            onChange={handleChange}
          />
        </ContentBoxWrapper>
        <div className="buttons">
          <StyledButton onClick={handleCancel}>{CANCEL}</StyledButton>
          <StyledButton success onClick={handleConfirm}>{CONFIRM}</StyledButton>
        </div>
      </ModalBoxWrapper>
    </ApplicationFormModalWrapper>
  );
};

export default ApplicationFormModal;
