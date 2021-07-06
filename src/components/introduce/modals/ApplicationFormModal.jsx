import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useForm } from 'react-hook-form';

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

const ApplicationFormModal = ({ visible, onCancel, onSubmit }) => {
  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();

  const handleCancel = () => {
    onCancel();
    reset();
  };

  const formSubmitHandler = (formData) => {
    onSubmit(formData);
    reset();
  };

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
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <ContentBoxWrapper>
            <label htmlFor="apply-reason">{APPLY_REASON}</label>
            <Textarea
              rows="10"
              id="apply-reason"
              placeholder="내용을 입력해주세요."
              error={errors?.reason}
              {...register('reason', { required: true })}
            />
          </ContentBoxWrapper>
          <ContentBoxWrapper>
            <label htmlFor="study-want">{WANT_TO_GET}</label>
            <Textarea
              rows="10"
              id="study-want"
              placeholder="내용을 입력해주세요."
              error={errors?.wantToGet}
              {...register('wantToGet', { required: true })}
            />
          </ContentBoxWrapper>
          <div className="buttons">
            <StyledButton type="button" onClick={handleCancel}>{CANCEL}</StyledButton>
            <StyledButton type="submit" success>{CONFIRM}</StyledButton>
          </div>
        </form>
      </ModalBoxWrapper>
    </ApplicationFormModalWrapper>
  );
};

export default ApplicationFormModal;
