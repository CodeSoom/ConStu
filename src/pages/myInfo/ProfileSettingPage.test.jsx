import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import USER_DETAIL from '../../../fixtures/user-detail';

import ProfileSettingPage from './ProfileSettingPage';

jest.mock('react-redux');

describe('ProfileSettingPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: USER_DETAIL.email,
        auth: null,
        authError: null,
        userDetail: USER_DETAIL,
      },
    }));
  });

  const renderProfileSettingPage = () => render((
    <ProfileSettingPage />
  ));

  it('renders My Info Setting Text Contents', () => {
    const { container } = renderProfileSettingPage();

    expect(container).toHaveTextContent('계정 설정');
  });
});
