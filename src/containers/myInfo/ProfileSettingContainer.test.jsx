import React from 'react';

import { render } from '@testing-library/react';

import ProfileSettingContainer from './ProfileSettingContainer';

describe('ProfileSettingContainer', () => {
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
  });

  context('without user', () => {
    it('render "로그인 후 이용해주세요"', () => {
      const { container } = renderProfileSettingContainer();

      expect(container).toHaveTextContent(/로그인 후 이용해주세요/i);
    });
  });
});
