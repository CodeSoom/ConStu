import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import MockTheme from '../../common/test/MockTheme';
import AskMembershipWithdrawal from './AskMembershipWithdrawal';

describe('AskMembershipWithdrawal', () => {
  const handleCancel = jest.fn();
  const handleConfirm = jest.fn();

  const renderAskMembershipWithdrawal = ({ visible }) => render((
    <MockTheme>
      <AskMembershipWithdrawal
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
      const { container } = renderAskMembershipWithdrawal(modal);

      expect(container).toHaveTextContent('회원 탈퇴');
      expect(container).toHaveTextContent('회원을 탈퇴하시겠습니까?');
    });

    it('calls confirm event action', () => {
      const { getByText } = renderAskMembershipWithdrawal(modal);

      const button = getByText('확인');

      fireEvent.click(button);

      expect(handleConfirm).toBeCalled();
    });

    it('calls cancel event action', () => {
      const { getByText } = renderAskMembershipWithdrawal(modal);

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
      const { container } = renderAskMembershipWithdrawal(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
