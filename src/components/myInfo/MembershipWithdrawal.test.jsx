import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import MockTheme from '../common/test/MockTheme';
import MembershipWithdrawal from './MembershipWithdrawal';

describe('MembershipWithdrawal', () => {
  const handleMembershipWithdrawalClick = jest.fn();
  const handleVerificationPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderMembershipWithdrawal = () => render((
    <MockTheme>
      <MembershipWithdrawal
        onMembershipWithdrawal={handleMembershipWithdrawalClick}
        onVerificationPassword={handleVerificationPassword}
      />
    </MockTheme>
  ));

  it('should be render "회원 탈퇴" button', () => {
    const { container } = renderMembershipWithdrawal();

    expect(container).toHaveTextContent('회원 탈퇴');
  });

  describe('When click "회원 탈퇴" button', () => {
    it('should visible confirm password modal', () => {
      const { getByText, container } = renderMembershipWithdrawal();

      fireEvent.click(getByText('회원 탈퇴'));

      expect(container).toHaveTextContent('비밀번호 확인');
    });

    context('without input value', () => {
      it('should be nothing input value', () => {
        const { getByText, getByLabelText } = renderMembershipWithdrawal();

        fireEvent.click(getByText('회원 탈퇴'));

        const input = getByLabelText('password-confirm-input');

        expect(input.value).toBe('');
      });

      describe('When Click VerificationPassword Confirm button ', () => {
        it('nothing happen anywhere so, renders verification password modal', () => {
          const { getByText, getByLabelText, container } = renderMembershipWithdrawal();

          fireEvent.click(getByText('회원 탈퇴'));

          const input = getByLabelText('password-confirm-input');

          fireEvent.change(input, {
            target: { value: '' },
          });

          fireEvent.submit(getByText('확인'));

          expect(container).toHaveTextContent('비밀번호 확인');
        });
      });
    });

    context('with input value', () => {
      it('should be change password input value', () => {
        const { getByText, getByLabelText } = renderMembershipWithdrawal();

        fireEvent.click(getByText('회원 탈퇴'));

        const input = getByLabelText('password-confirm-input');

        fireEvent.change(input, {
          target: { value: 'password' },
        });

        expect(input.value).toBe('password');
      });

      describe('When Click VerificationPassword Confirm button ', () => {
        it('should be render ask membership withdrawal modal and call VerificationPassword', () => {
          const { getByText, getByLabelText, container } = renderMembershipWithdrawal();

          fireEvent.click(getByText('회원 탈퇴'));

          const input = getByLabelText('password-confirm-input');

          fireEvent.change(input, {
            target: { value: 'password' },
          });

          fireEvent.submit(getByText('확인'));

          expect(handleVerificationPassword).toBeCalledWith('password');
          expect(container).toHaveTextContent('회원을 탈퇴하시겠습니까?');
        });
      });

      describe('When Click in membership withdrawal modal Confirm button ', () => {
        it('should be call membership withdrawal', () => {
          const { getByText, getByLabelText } = renderMembershipWithdrawal();

          fireEvent.click(getByText('회원 탈퇴'));

          const input = getByLabelText('password-confirm-input');

          fireEvent.change(input, {
            target: { value: 'password' },
          });

          fireEvent.submit(getByText('확인'));

          fireEvent.click(getByText('확인'));

          expect(handleMembershipWithdrawalClick).toBeCalledTimes(1);
        });
      });
    });

    describe('Click membership withdrawal modal cancel button', () => {
      it("shouldn't call membership withdrawal", () => {
        const { getByText } = renderMembershipWithdrawal();

        fireEvent.click(getByText('회원 탈퇴'));

        fireEvent.click(getByText('취소'));

        expect(handleMembershipWithdrawalClick).not.toBeCalled();
      });
    });
  });
});
