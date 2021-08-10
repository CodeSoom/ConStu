import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render, fireEvent, screen } from '@testing-library/react';

import ProfileSettingContainer from './ProfileSettingContainer';

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
    <ProfileSettingContainer
      user={user}
    />
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

        expect(dispatch).toBeCalledTimes(1);
      });
    });

    describe('Click password reset button', () => {
      it('should listen dispatch action event', () => {
        const { getByText } = renderProfileSettingContainer(currentUser);

        fireEvent.click(getByText(/비밀번호 재설정/i));

        expect(dispatch).toBeCalledTimes(1);
      });
    });

    describe('Clicks send email after action', () => {
      context('When success dispatch action', () => {
        given('auth', () => (true));

        it('should render "이메일을 확인해주세요!" message', () => {
          renderProfileSettingContainer(currentUser);

          expect(screen.findByText('이메일을 확인해주세요!')).not.toBeNull();
        });
      });

      context('When failure dispatch action', () => {
        given('authError', () => ('error'));

        it('should render "메일 전송에 실패하였습니다." message', () => {
          renderProfileSettingContainer(currentUser);

          expect(screen.findByText('메일 전송에 실패하였습니다.')).not.toBeNull();
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
