import React from 'react';

import ModalWindow from '../../common/ModalWindow';

const AskMembershipWithdrawal = ({ visible, onCancel, onConfirm }) => (
  <ModalWindow
    title="회원 탈퇴"
    description="회원을 탈퇴하시겠습니까?"
    visible={visible}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);

export default AskMembershipWithdrawal;
