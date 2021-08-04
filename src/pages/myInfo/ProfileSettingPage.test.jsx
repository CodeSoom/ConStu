import React from 'react';

import { render } from '@testing-library/react';

import ProfileSettingPage from './ProfileSettingPage';

describe('ProfileSettingPage', () => {
  const renderProfileSettingPage = () => render((
    <ProfileSettingPage />
  ));

  it('renders My Info Setting Text Contents', () => {
    const { container } = renderProfileSettingPage();

    expect(container).toHaveTextContent('계정 설정');
  });
});
