import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import { twoSecondsLater } from '../../util/utils';
import studyGroup from '../../../fixtures/study-group';

import StudyGroupsContainer from './StudyGroupsContainer';

describe('StudyGroupsContainer', () => {
  const dispatch = jest.fn();

  jest.useFakeTimers();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      groupReducer: {
        groups: given.groups,
      },
      authReducer: {
        user: 'user1',
      },
    }));
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderStudyGroupsContainer = () => render((
    <MemoryRouter>
      <StudyGroupsContainer />
    </MemoryRouter>
  ));

  context('with groups', () => {
    given('groups', () => ([{
      ...studyGroup,
      applyEndDate: twoSecondsLater,
    }]));

    it('renders groups title', async () => {
      const { container } = renderStudyGroupsContainer();

      expect(container).toHaveTextContent('스터디를 소개합니다.2');
    });

    it('click event calls dispatch', async () => {
      const { getByText } = renderStudyGroupsContainer();

      fireEvent.click(getByText('#JavaScript'));

      expect(dispatch).toBeCalled();
    });

    it('The status changes to the deadline for recruitment after 2 seconds.', async () => {
      const { container } = renderStudyGroupsContainer();

      expect(container).toHaveTextContent(/몇 초 후 모집 마감/i);

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(container).toHaveTextContent(/모집 마감/i);
    });
  });

  context('without groups', () => {
    given('groups', () => ([]));

    it('nothing group list text message', () => {
      const { container } = renderStudyGroupsContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
