import React from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { APPLY_FORM_TITLE, BUTTON_NAME } from '../../../util/constants/constants';

import palette from '../../../styles/palette';
import mq from '../../../styles/responsive';

import Button from '../../../styles/Button';
import Textarea from '../../../styles/Textarea';
import ResumeSvg from '../../../assets/icons/resume.svg';
import ReasonSvg from '../../../assets/icons/reason.svg';
import GetSvg from '../../../assets/icons/get.svg';

const { CLOSE } = BUTTON_NAME;
const { APPLY_REASON, WANT_TO_GET } = APPLY_FORM_TITLE;

const ApplicationViewModalWrapper = styled.div`
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
  })};

  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 6px;
  height: auto;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  background: white;

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.3rem;
    word-break: keep-all;
    overflow-wrap: break-word;
    padding-left: .5rem;
    padding-top: .2rem;
  }
`;

const ContentBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.2rem;

  label {
    ${mq({ fontSize: ['1rem', '1.1rem'] })};
    margin-left: .3rem;
  }
`;

const ContentViewerWrapper = styled(Textarea)`
  cursor: unset;
  margin-bottom: 1rem;

  &:focus {
    ${mq({ border: [`1px solid ${palette.gray[5]}`, `2px solid ${palette.gray[5]}`] })};
  }
`;

const SubTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const StyledButton = styled(Button)`
  &:last-of-type {
    margin-left: .7rem;
  }
`;

const ResumeIcon = styled(ResumeSvg)`
  width: 28px;
  height: 28px;
`;

const iconCss = mq({
  width: ['20px', '22px'],
  height: ['20px', '22px'],
});

const ReasonIcon = styled(ReasonSvg)`
  ${iconCss}
`;

const GetIcon = styled(GetSvg)`
  ${iconCss}
`;

const ApplicationViewModal = ({
  visible, onClose, participant,
}) => {
  const { reason, wantToGet, id } = participant;

  if (!visible) {
    return null;
  }

  return (
    <ApplicationViewModalWrapper visible className="animation">
      <ModalBoxWrapper>
        <HeaderWrapper>
          <ResumeIcon />
          <h2>
            {`${id} 신청서`}
          </h2>
        </HeaderWrapper>
        <ContentBoxWrapper>
          <SubTitleWrapper>
            <ReasonIcon />
            <label htmlFor="apply-reason">
              {APPLY_REASON}
            </label>
          </SubTitleWrapper>
          <ContentViewerWrapper
            rows="10"
            id="apply-reason"
            value={reason}
            readOnly
          />
        </ContentBoxWrapper>
        <ContentBoxWrapper>
          <SubTitleWrapper>
            <GetIcon />
            <label htmlFor="study-want">{WANT_TO_GET}</label>
          </SubTitleWrapper>
          <ContentViewerWrapper
            rows="10"
            id="study-want"
            value={wantToGet}
            readOnly
          />
        </ContentBoxWrapper>
        <div className="buttons">
          <StyledButton onClick={onClose}>{CLOSE}</StyledButton>
        </div>
      </ModalBoxWrapper>
    </ApplicationViewModalWrapper>
  );
};

export default ApplicationViewModal;
