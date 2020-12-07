import React from 'react';

import ModalWindow from '../../common/ModalWindow';

const AskLoginModal = ({ visible, onCancel }) => (
  <ModalWindow
    visible={visible}
    cancelText="확인"
    onCancel={onCancel}
    title="신청 실패!"
    description="로그인 후 신청 가능합니다."
  />
);

export default AskLoginModal;
