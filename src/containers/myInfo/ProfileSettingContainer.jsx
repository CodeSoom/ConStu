import React, { useCallback, useEffect } from 'react';

import styled from '@emotion/styled';

import { useUnmount } from 'react-use';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  logout,
  clearAuth,
  requestDeleteUser,
  requestResetPassword,
  requestEmailVerification,
  requestReauthenticateWithCredential,
  requestUpdateProfile,
} from '../../reducers/authSlice';
import { FIREBASE_AUTH_ERROR_MESSAGE, ERROR_MESSAGE, SUCCESS_AUTH_MESSAGE } from '../../util/constants/messages';

import useAuth from '../../hooks/useAuth';

import ProfileSettingForm from '../../components/myInfo/ProfileSettingForm';
import MembershipWithdrawal from '../../components/myInfo/MembershipWithdrawal';

const ProfileSettingContainerWrapper = styled.div`

`;

const ProfileSettingContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { auth, authError, userDetail } = useAuth();

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

  const onUpdateProfile = useCallback(
    (newProfile) => dispatch(requestUpdateProfile(newProfile)),
    [dispatch],
  );

  useEffect(() => {
    if (authError) {
      toast.error(
        FIREBASE_AUTH_ERROR_MESSAGE[authError]
        || ERROR_MESSAGE.UNKNOWN,
      );
      dispatch(clearAuth());
    }
  }, [authError]);

  useEffect(() => {
    if (auth === 'CONFIRM_EMAIL') {
      toast.success(SUCCESS_AUTH_MESSAGE.CONFIRM_EMAIL);
    }

    if (auth === 'WITHDRAWAL') {
      history.push('/');
      toast.success(SUCCESS_AUTH_MESSAGE.MEMBERSHIP_WITHDRAWAL);
      dispatch(logout());
    }

    if (auth === 'UPDATE_PROFILE') {
      toast.success(SUCCESS_AUTH_MESSAGE.UPDATE_PROFILE);
    }

    dispatch(clearAuth());
  }, [auth]);

  useUnmount(() => {
    dispatch(clearAuth());
  });

  if (!userDetail) {
    return <div>로딩중..</div>;
  }

  return (
    <ProfileSettingContainerWrapper>
      <ProfileSettingForm
        user={userDetail}
        onSave={onUpdateProfile}
        onSendEmailVerification={onClickSendEmailVerification}
        onSendPasswordResetEmail={onClickSendPasswordResetEmail}
      />
      <MembershipWithdrawal
        auth={auth}
        onMembershipWithdrawal={onClickMembershipWithdrawal}
        onVerificationPassword={onClickVerificationPassword}
      />
    </ProfileSettingContainerWrapper>
  );
};

export default ProfileSettingContainer;
