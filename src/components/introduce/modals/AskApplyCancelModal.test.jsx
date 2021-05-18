import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import MockTheme from '../../common/test/MockTheme';
import AskApplyCancelModal from './AskApplyCancelModal';

describe('AskApplyCancelModal', () => {
  const handleCancel = jest.fn();
  const handleConfirm = jest.fn();

  const renderAskApplyCancelModal = ({ visible }) => render((
    <MockTheme>
      <AskApplyCancelModal
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
      const { container } = renderAskApplyCancelModal(modal);

      expect(container).toHaveTextContent('신청 취소');
      expect(container).toHaveTextContent('스터디 그룹 신청을 취소하시겠습니까?');
    });

    it('calls confirm event action', () => {
      const { getByText } = renderAskApplyCancelModal(modal);

      const button = getByText('확인');

      fireEvent.click(button);

      expect(handleConfirm).toBeCalled();
    });

    it('calls cancel event action', () => {
      const { getByText } = renderAskApplyCancelModal(modal);

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
      const { container } = renderAskApplyCancelModal(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
