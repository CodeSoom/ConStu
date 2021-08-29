import React from 'react';

import styled from '@emotion/styled';

import Button from '../../styles/Button';

const ProfileDetailFormWrapper = styled.div`

`;

const ProfileDetailForm = ({ user, onSendEmailVerification, onSendPasswordResetEmail }) => (
  <ProfileDetailFormWrapper>
    <div>
      {`이메일: ${user.email}`}
      {user.emailVerified ? (
        <div> 이메일 인증 완료 </div>
      ) : (
        <Button
          onClick={onSendEmailVerification}
        >
          이메일 인증 하기
        </Button>
      )}
    </div>
    <div>
      {`별명: ${user.displayName || user.email}`}
    </div>
    <div>
      {`프로필: ${user.photoURL || '없음'} `}
    </div>
    <Button
      success
      onClick={onSendPasswordResetEmail}
    >
      비밀번호 재설정
    </Button>
  </ProfileDetailFormWrapper>
);
export default ProfileDetailForm;
