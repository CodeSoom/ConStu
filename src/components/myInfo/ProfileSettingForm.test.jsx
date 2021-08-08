import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import ProfileSettingForm from './ProfileSettingForm';

describe('ProfileSettingForm', () => {
  const handleSendEmailVerification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderProfileSettingForm = () => render((
    <MemoryRouter>
      <ProfileSettingForm
        user={given.user}
        onSendEmailVerification={handleSendEmailVerification}
      />
    </MemoryRouter>
  ));

  describe('render profile detail form', () => {
    it('render reset password button and withdrawal', () => {
      given('user', () => ({
        email: 'test@test.com',
        emailVerified: false,
        displayName: null,
        photoURL: null,
      }));

      const { container } = renderProfileSettingForm();

      expect(container).toHaveTextContent('비밀번호 재설정');
      expect(container).toHaveTextContent('회원 탈퇴');
    });

    context('Is email verify', () => {
      context('with displayName and photoURL', () => {
        given('user', () => ({
          email: 'test@test.com',
          emailVerified: true,
          displayName: 'test',
          photoURL: 'test url',
        }));

        it('should render "이메일 인증 완료"', () => {
          const { container } = renderProfileSettingForm();

          expect(container).toHaveTextContent(/이메일 인증 완료/i);
        });

        it('should render display name and photoUrl', () => {
          const { container } = renderProfileSettingForm();

          expect(container).toHaveTextContent(/test url/i);
          expect(container).toHaveTextContent(/test/i);
        });
      });

      context('without displayName and photoURL', () => {
        given('user', () => ({
          email: 'test@test.com',
          emailVerified: true,
          displayName: null,
          photoURL: null,
        }));

        it('should render "이메일 인증 완료"', () => {
          const { container } = renderProfileSettingForm();

          expect(container).toHaveTextContent(/이메일 인증 완료/i);
        });

        it('should render "없음"', () => {
          const { container } = renderProfileSettingForm();

          expect(container).toHaveTextContent(/없음/i);
        });
      });
    });

    context("Isn't email verify", () => {
      given('user', () => ({
        email: 'test@test.com',
        emailVerified: false,
        displayName: null,
        photoURL: null,
      }));

      it('should render "이메일 인증 하기" button', () => {
        const { container } = renderProfileSettingForm();

        expect(container).toHaveTextContent(/이메일 인증 하기/i);
      });

      describe('When click "이메인 인증 하기" button', () => {
        it('Call onSendEmailVerification click event', () => {
          const { getByText } = renderProfileSettingForm();

          fireEvent.click(getByText(/이메일 인증 하기/i));

          expect(handleSendEmailVerification).toBeCalledTimes(1);
        });
      });
    });
  });
});
