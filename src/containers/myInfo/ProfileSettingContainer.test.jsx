import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render, fireEvent, screen } from '@testing-library/react';

import ProfileSettingContainer from './ProfileSettingContainer';
import InjectMockProviders from '../../components/common/test/InjectMockProviders';

describe('ProfileSettingContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      authReducer: {
        auth: given.auth,
        authError: given.authError,
      },
    }));
  });

  const renderProfileSettingContainer = (user) => render((
    <InjectMockProviders>
      <ProfileSettingContainer
        user={user}
      />
    </InjectMockProviders>
  ));

  context('with user', () => {
    const currentUser = {
      displayName: 'test@test.com',
      email: 'test@test.com',
      emailVerified: false,
      photoURL: null,
    };

    it('should render profile form content', () => {
      const { container } = renderProfileSettingContainer(currentUser);

      expect(container).toHaveTextContent(currentUser.email);
      expect(container).toHaveTextContent(currentUser.displayName);
    });

    describe('Click email verification button', () => {
      it('should listen dispatch action event', () => {
        const { getByText } = renderProfileSettingContainer(currentUser);

        fireEvent.click(getByText(/이메일 인증 하기/i));

        expect(dispatch).toBeCalledTimes(2);
      });
    });

    describe('Click password reset button', () => {
      it('should listen dispatch action event', () => {
        const { getByText } = renderProfileSettingContainer(currentUser);

        fireEvent.click(getByText(/비밀번호 재설정/i));

        expect(dispatch).toBeCalledTimes(2);
      });
    });

    describe('Click membership withdrawal button', () => {
      it('should be visible verification Password modal', () => {
        const { getByText, container } = renderProfileSettingContainer(currentUser);

        fireEvent.click(getByText(/회원 탈퇴/i));

        expect(container).toHaveTextContent('비밀번호 확인');
      });

      describe('Click verification Password modal confirm button', () => {
        it('should listen dispatch action event', () => {
          const { getByText, getByLabelText } = renderProfileSettingContainer(currentUser);

          fireEvent.click(getByText(/회원 탈퇴/i));

          const input = getByLabelText('password-confirm-input');

          fireEvent.change(input, {
            target: { value: 'password' },
          });

          fireEvent.submit(input);

          expect(dispatch).toBeCalledTimes(2);
        });
      });

      describe('Click membership withdrawal modal confirm button', () => {
        it('should listen dispatch action event', () => {
          given('auth', () => 'REAUTHENTICATE');
          const { getByText } = renderProfileSettingContainer(currentUser);

          fireEvent.click(getByText(/확인/i));

          expect(dispatch).toBeCalledTimes(2);
        });

        describe('After success membership withdrawal dispatch action', () => {
          given('auth', () => 'WITHDRAWAL');

          it('Render "탈퇴되었습니다." success message and go to home', () => {
            renderProfileSettingContainer(currentUser);

            expect(screen.findByText('탈퇴되었습니다.')).not.toBeNull();
            expect(dispatch).toBeCalledWith({
              type: 'auth/clearAuth',
            });
          });
        });
      });
    });

    describe('Clicks send email after action', () => {
      context('When success dispatch action', () => {
        given('auth', () => ('CONFIRM_EMAIL'));

        it('should render "이메일을 확인해주세요!" message', () => {
          renderProfileSettingContainer(currentUser);

          expect(screen.findByText('이메일을 확인해주세요!')).not.toBeNull();
        });
      });

      context('When failure dispatch action', () => {
        it('should render "알 수 없는 오류가 발생했습니다." message', () => {
          given('authError', () => ('error'));
          renderProfileSettingContainer(currentUser);

          expect(screen.findByText('알 수 없는 오류가 발생했습니다.')).not.toBeNull();
        });

        it('should render "잠시 후 다시 시도해 주세요." message', () => {
          given('authError', () => ('auth/too-many-requests'));

          expect(screen.findByText('잠시 후 다시 시도해 주세요.')).not.toBeNull();
        });
      });
    });
  });

  context('without user', () => {
    it('render "로그인 후 이용해주세요"', () => {
      const { container } = renderProfileSettingContainer();

      expect(container).toHaveTextContent(/로그인 후 이용해주세요/i);
    });
  });
});
