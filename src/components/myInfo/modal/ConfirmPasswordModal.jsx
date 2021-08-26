import React from 'react';

import FormModalWindow from '../../common/FormModalWindow';

const ConfirmPasswordModal = ({
  visible, onConfirm, onCancel, handleChange, password,
}) => (
  <FormModalWindow
    title="비밀번호 확인"
    visible={visible}
    onConfirm={onConfirm}
    onCancel={onCancel}
  >
    <input
      type="password"
      autoComplete="password"
      value={password}
      onChange={handleChange}
      aria-label="password-confirm-input"
    />
  </FormModalWindow>
);

export default ConfirmPasswordModal;
