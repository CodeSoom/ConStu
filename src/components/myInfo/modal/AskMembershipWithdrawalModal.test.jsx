import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import MockTheme from '../../common/test/MockTheme';
import AskMembershipWithdrawalModal from './AskMembershipWithdrawalModal';

describe('AskMembershipWithdrawalModal', () => {
  const handleCancel = jest.fn();
  const handleConfirm = jest.fn();

  const renderAskMembershipWithdrawalModal = ({ visible }) => render((
    <MockTheme>
      <AskMembershipWithdrawalModal
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
      const { container } = renderAskMembershipWithdrawalModal(modal);

      expect(container).toHaveTextContent('회원 탈퇴');
      expect(container).toHaveTextContent('회원을 탈퇴하시겠습니까?');
    });

    it('calls confirm event action', () => {
      const { getByText } = renderAskMembershipWithdrawalModal(modal);

      const button = getByText('확인');

      fireEvent.click(button);

      expect(handleConfirm).toBeCalled();
    });

    it('calls cancel event action', () => {
      const { getByText } = renderAskMembershipWithdrawalModal(modal);

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
      const { container } = renderAskMembershipWithdrawalModal(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
