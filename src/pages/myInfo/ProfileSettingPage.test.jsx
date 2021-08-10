import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import ProfileSettingPage from './ProfileSettingPage';

jest.mock('react-redux');

describe('ProfileSettingPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      authReducer: {
        user: '',
        auth: null,
        authError: null,
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
