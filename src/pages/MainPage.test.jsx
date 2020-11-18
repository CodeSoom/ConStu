import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import MainPage from './MainPage';

jest.mock('react-redux');

describe('MainPage', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      groups: [],
    }));
  });

  const renderMainPage = () => render(
    <MainPage />,
  );

  it('renders Main Page Title', () => {
    const { container } = renderMainPage();

    expect(container).toHaveTextContent('스터디 목록');
  });

  it('calls dispatch with loadStudyGroups action', () => {
    renderMainPage();

    expect(dispatch).toBeCalled();
  });
});
