import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import MainPage from './MainPage';
import STUDY_GROUPS from '../../fixtures/study-groups';

describe('MainPage', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      groups: STUDY_GROUPS,
    }));
  });

  const renderMainPage = () => render((
    <MemoryRouter initialEntries={['/?tag=JavaScript']}>
      <MainPage />
    </MemoryRouter>
  ));

  it('renders Main Page Title', () => {
    const { container } = renderMainPage();

    expect(container).toHaveTextContent('지금 바로 시작하세요!');
  });

  it('calls dispatch with loadStudyGroups action', () => {
    const { container } = renderMainPage();

    expect(dispatch).toBeCalled();

    expect(container).toHaveTextContent('스터디를 소개합니다.1');
    expect(container).toHaveTextContent('스터디를 소개합니다.2');
  });

  it('Click event to calls dispatch', () => {
    const { getByText } = renderMainPage();

    fireEvent.click(getByText('#JavaScript'));

    expect(dispatch).toBeCalled();
  });
});
