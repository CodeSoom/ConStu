import React, { useCallback, useEffect } from 'react';

import styled from '@emotion/styled';

import { useUnmount } from 'react-use';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth } from '../../util/utils';
import {
  clearAuth,
  requestDeleteUser,
  requestResetPassword,
  requestEmailVerification,
  requestReauthenticateWithCredential,
} from '../../reducers/authSlice';
import { FIREBASE_AUTH_ERROR_MESSAGE, ERROR_MESSAGE } from '../../util/constants/messages';

import ProfileSettingForm from '../../components/myInfo/ProfileSettingForm';

const ProfileSettingContainerWrapper = styled.div`

`;

const ProfileSettingContainer = ({ user }) => {
  const dispatch = useDispatch();

  const auth = useSelector(getAuth('auth'));
  const authError = useSelector(getAuth('authError'));

  const onClickSendEmailVerification = useCallback(
    () => dispatch(requestEmailVerification()),
    [dispatch],
  );

  const onClickSendPasswordResetEmail = useCallback(
    () => dispatch(requestResetPassword()),
    [dispatch],
  );

  const onClickMembershipWithdrawal = useCallback(
    () => dispatch(requestDeleteUser()),
    [dispatch],
  );

  const onClickVerificationPassword = useCallback(
    (password) => dispatch(requestReauthenticateWithCredential(password)),
    [dispatch],
  );

  useEffect(() => {
    if (authError) {
      toast.error(
        FIREBASE_AUTH_ERROR_MESSAGE[authError]
        || ERROR_MESSAGE.FAILURE_SEND_EMAIL,
      );
      return;
    }

    // TODO - 성공시 상수로 메시지를 분리해 auth 로직을 분리해주기
    if (auth) {
      toast.success('이메일을 확인해주세요!');
    }
  }, [authError, auth]);

  useUnmount(() => {
    dispatch(clearAuth());
  });

  if (!user) {
    return <div>로그인 후 이용해주세요</div>;
  }

  return (
    <ProfileSettingContainerWrapper>
      <ProfileSettingForm
        user={user}
        onMembershipWithdrawal={onClickMembershipWithdrawal}
        onSendEmailVerification={onClickSendEmailVerification}
        onSendPasswordResetEmail={onClickSendPasswordResetEmail}
        onVerificationPassword={onClickVerificationPassword}
      />
    </ProfileSettingContainerWrapper>
  );
};

export default ProfileSettingContainer;
