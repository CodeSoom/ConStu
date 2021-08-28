import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ProfileSettingForm from './ProfileSettingForm';
import InjectMockProviders from '../common/test/InjectMockProviders';

describe('ProfileSettingForm', () => {
  const handleSendEmailVerification = jest.fn();
  const handleSendPasswordReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderProfileSettingForm = () => render((
    <InjectMockProviders>
      <ProfileSettingForm
        user={given.user}
        onSendPasswordResetEmail={handleSendPasswordReset}
        onSendEmailVerification={handleSendEmailVerification}
      />
    </InjectMockProviders>
  ));

  describe('When click "비밀번호 재설정" button', () => {
    given('user', () => ({
      email: 'test@test.com',
      emailVerified: false,
      displayName: null,
      photoURL: null,
    }));

    it('should call click event', () => {
      const { getByText } = renderProfileSettingForm();

      fireEvent.click(getByText('비밀번호 재설정'));

      expect(handleSendPasswordReset).toBeCalledTimes(1);
    });
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
