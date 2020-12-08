import React from 'react';

import ModalWindow from '../../common/ModalWindow';

const AskApplyCancelModal = ({ visible, onCancel, onConfirm }) => (
  <ModalWindow
    title="신청 취소"
    description="스터디 그룹 신청을 취소하시겠습니까?"
    visible={visible}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);

export default AskApplyCancelModal;
