import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import MockTheme from '../common/test/MockTheme';
import MembershipWithdrawal from './MembershipWithdrawal';

describe('MembershipWithdrawal', () => {
  const handleVerificationPassword = jest.fn();
  const handleMembershipWithdrawalClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderMembershipWithdrawal = (auth = '') => render((
    <MockTheme>
      <MembershipWithdrawal
        auth={auth}
        onVerificationPassword={handleVerificationPassword}
        onMembershipWithdrawal={handleMembershipWithdrawalClick}
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
        it('change input border color to red', () => {
          const { getByText, getByLabelText, container } = renderMembershipWithdrawal();

          fireEvent.click(getByText('회원 탈퇴'));

          const input = getByLabelText('password-confirm-input');

          fireEvent.change(input, {
            target: { value: '' },
          });

          fireEvent.submit(getByText('확인'));

          expect(input).toHaveStyle('border: 1px solid #ff8787');
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
        it('should be  call VerificationPassword', () => {
          const { getByText, getByLabelText } = renderMembershipWithdrawal();

          fireEvent.click(getByText('회원 탈퇴'));

          const input = getByLabelText('password-confirm-input');

          fireEvent.change(input, {
            target: { value: 'password' },
          });

          fireEvent.submit(getByText('확인'));

          expect(handleVerificationPassword).toBeCalledWith('password');
        });
      });

      describe('When Click in membership withdrawal modal Confirm button ', () => {
        it('should be call membership withdrawal', () => {
          const { getByText } = renderMembershipWithdrawal('REAUTHENTICATE');

          fireEvent.click(getByText('확인'));

          expect(handleMembershipWithdrawalClick).toBeCalledTimes(1);
        });
      });

      describe('When Click in membership withdrawal modal Cancel button ', () => {
        it("shouldn't call membership withdrawal and disappear ask membership withdrawal modal", () => {
          const { getByText, container } = renderMembershipWithdrawal('REAUTHENTICATE');

          fireEvent.click(getByText('취소'));

          expect(handleMembershipWithdrawalClick).not.toBeCalled();
          expect(container).not.toHaveTextContent('회원을 탈퇴하시겠습니까?');
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
