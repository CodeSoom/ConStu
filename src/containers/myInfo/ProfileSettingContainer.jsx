import React, { useCallback, useEffect } from 'react';

import styled from '@emotion/styled';

import { useUnmount } from 'react-use';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth } from '../../util/utils';
import { requestEmailVerification, clearAuth, requestResetPassword } from '../../reducers/authSlice';
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

  useEffect(() => {
    if (authError) {
      toast.error(
        FIREBASE_AUTH_ERROR_MESSAGE[authError]
        || ERROR_MESSAGE.FAILURE_SEND_EMAIL,
      );
      return;
    }

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
        onSendEmailVerification={onClickSendEmailVerification}
        onSendPasswordResetEmail={onClickSendPasswordResetEmail}
      />
    </ProfileSettingContainerWrapper>
  );
};

export default ProfileSettingContainer;
