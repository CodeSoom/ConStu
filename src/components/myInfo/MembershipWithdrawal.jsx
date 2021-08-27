import React, { useState, useCallback, useEffect } from 'react';

import styled from '@emotion/styled';

import Button from '../../styles/Button';

import ConfirmPasswordModal from './modal/ConfirmPasswordModal';
import AskMembershipWithdrawalModal from './modal/AskMembershipWithdrawalModal';

const MembershipWithdrawalWrapper = styled.div`

`;

const MembershipWithdrawal = ({ onMembershipWithdrawal, onVerificationPassword, auth }) => {
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [askModal, setAskModal] = useState(false);
  const [verificationPasswordModal, setVerificationPasswordModal] = useState(false);

  const handleClickDeleteUser = () => setVerificationPasswordModal(true);

  const handleMembershipWithdrawalCancel = () => {
    setAskModal(false);
    setPassword('');
  };

  const handleChange = (e) => {
    setError(false);
    setPassword(e.target.value);
  };

  const handleMembershipWithdrawalConfirm = () => {
    setAskModal(false);
    onMembershipWithdrawal();
  };

  const handleVerificationPasswordConfirm = useCallback((e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError(true);
      return;
    }

    onVerificationPassword(password);
    setPassword('');
  }, [password]);

  const handleVerificationPasswordCancel = () => {
    setError(false);
    setVerificationPasswordModal(false);
    setPassword('');
  };

  useEffect(() => {
    if (auth === 'REAUTHENTICATE') {
      setVerificationPasswordModal(false);
      setAskModal(true);
    }
  }, [auth]);

  return (
    <MembershipWithdrawalWrapper>
      <Button
        warn
        onClick={handleClickDeleteUser}
      >
        회원 탈퇴
      </Button>
      <AskMembershipWithdrawalModal
        visible={askModal}
        onCancel={handleMembershipWithdrawalCancel}
        onConfirm={handleMembershipWithdrawalConfirm}
      />
      <ConfirmPasswordModal
        error={error}
        password={password}
        handleChange={handleChange}
        visible={verificationPasswordModal}
        onCancel={handleVerificationPasswordCancel}
        onConfirm={handleVerificationPasswordConfirm}
      />
    </MembershipWithdrawalWrapper>
  );
};

export default MembershipWithdrawal;
