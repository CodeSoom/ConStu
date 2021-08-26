import React, { useState, useCallback } from 'react';

import styled from '@emotion/styled';

import Button from '../../styles/Button';

import ConfirmPasswordModal from './modal/ConfirmPasswordModal';
import AskMembershipWithdrawalModal from './modal/AskMembershipWithdrawalModal';

const MembershipWithdrawalWrapper = styled.div`

`;

const MembershipWithdrawal = ({ onMembershipWithdrawal, onVerificationPassword }) => {
  const [password, setPassword] = useState('');
  const [askModal, setAskModal] = useState(false);
  const [verificationPasswordModal, setVerificationPasswordModal] = useState(false);

  const handleClickDeleteUser = () => setVerificationPasswordModal(true);

  const handleMembershipWithdrawalCancel = () => setAskModal(false);

  const handleChange = (e) => setPassword(e.target.value);

  const handleMembershipWithdrawalConfirm = () => {
    setAskModal(false);
    onMembershipWithdrawal();
  };

  const handleVerificationPasswordConfirm = useCallback((e) => {
    e.preventDefault();

    if (!password.trim()) {
      return;
    }

    onVerificationPassword(password);
    // TODO - 성공 / 실패 분리 로직 추가하기
    setVerificationPasswordModal(false);
    setAskModal(true);
  }, [password]);

  const handleVerificationPasswordCancel = () => setVerificationPasswordModal(false);

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
