import React, { useState, useCallback } from 'react';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import Button from '../../styles/Button';
import palette from '../../styles/palette';

const ProfileDetailFormWrapper = styled.div`

`;
const DetailFormContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.2rem;

  .required {
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

  label {
    ${mq({ fontSize: ['1rem', '1.2rem'] })};

    margin-bottom: 0.5rem;
  }
`;

const DetailInput = styled.input`
  display: block;
  height: 30px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderTone[2]};
  color: ${({ theme }) => theme.fontColor[1]};
  background-color: ${({ theme }) => theme.subBaseTone[0]};
  border-radius: 0.25rem;
  font-size: 16px;
  line-height: 24px;
  outline: 0;
  transition-delay: initial;
  transition-duration: 0.08s;
  transition-property: all;
  transition-timing-function: ease-in-out;
`;

const ProfileDetailForm = ({
  user, onSendEmailVerification, onSendPasswordResetEmail, onSave,
}) => {
  const {
    email, emailVerified, displayName, photoURL,
  } = user;

  const [nickName, setNickName] = useState(displayName || '');

  const handleSave = useCallback(() => {
    onSave({
      displayName: nickName,
    });
  }, [nickName]);

  const handleChangeNickName = (e) => setNickName(e.target.value);

  return (
    <ProfileDetailFormWrapper>
      <DetailFormContentWrapper>
        <label className="required" htmlFor="email">이메일</label>
        <DetailInput id="email" defaultValue={email} disabled />
        {emailVerified ? (
          <div> 이메일 인증 완료 </div>
        ) : (
          <Button
            onClick={onSendEmailVerification}
          >
            이메일 인증 하기
          </Button>
        )}
      </DetailFormContentWrapper>
      <DetailFormContentWrapper>
        <label htmlFor="displayName">별명</label>
        <DetailInput id="displayName" value={nickName} onChange={handleChangeNickName} />
      </DetailFormContentWrapper>
      <DetailFormContentWrapper>
        <label htmlFor="profileImage">프로필</label>
        <DetailInput id="profileImage" defaultValue={photoURL || '없음'} disabled />
      </DetailFormContentWrapper>
      <Button
        success
        onClick={onSendPasswordResetEmail}
      >
        비밀번호 재설정
      </Button>
      <Button
        onClick={handleSave}
      >
        저장
      </Button>
    </ProfileDetailFormWrapper>
  );
};
export default ProfileDetailForm;
