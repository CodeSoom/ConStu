import React from 'react';

import ModalWindow from '../../common/ModalWindow';

const AskArticleDeleteModal = ({ visible, onCancel, onConfirm }) => (
  <ModalWindow
    title="스터디 소개글 삭제"
    description="스터디 소개글을 삭제하시겠습니까?"
    visible={visible}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);

export default AskArticleDeleteModal;
