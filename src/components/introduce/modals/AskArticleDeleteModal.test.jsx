import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import MockTheme from '../../common/test/MockTheme';
import AskArticleDeleteModal from './AskArticleDeleteModal';

describe('AskArticleDeleteModal', () => {
  const handleCancel = jest.fn();
  const handleConfirm = jest.fn();

  const renderAskArticleDeleteModal = ({ visible }) => render((
    <MockTheme>
      <AskArticleDeleteModal
        visible={visible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </MockTheme>
  ));

  context('with visible', () => {
    const modal = {
      visible: true,
    };

    it('renders Modal text', () => {
      const { container } = renderAskArticleDeleteModal(modal);

      expect(container).toHaveTextContent('스터디 소개글 삭제');
      expect(container).toHaveTextContent('스터디 소개글을 삭제하시겠습니까?');
    });

    it('calls confirm event action', () => {
      const { getByText } = renderAskArticleDeleteModal(modal);

      const button = getByText('확인');

      fireEvent.click(button);

      expect(handleConfirm).toBeCalled();
    });

    it('calls cancel event action', () => {
      const { getByText } = renderAskArticleDeleteModal(modal);

      const button = getByText('취소');

      fireEvent.click(button);

      expect(handleCancel).toBeCalled();
    });
  });

  context('without visible', () => {
    const modal = {
      visible: false,
    };

    it("doesn't renders Modal text", () => {
      const { container } = renderAskArticleDeleteModal(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
