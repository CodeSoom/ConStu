import '../../util/__mocks__/matchMedia';

import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

import { twoSecondsLater } from '../../util/utils';
import studyGroup from '../../../fixtures/study-group';

import StudyGroupsContainer from './StudyGroupsContainer';
import MockTheme from '../../components/common/test/MockTheme';

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
      commonReducer: {
        theme: given.theme,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  const renderStudyGroupsContainer = () => render((
    <MockTheme>
      <MemoryRouter>
        <StudyGroupsContainer />
      </MemoryRouter>
    </MockTheme>
  ));

  context('with groups', () => {
    given('groups', () => ([{
      ...studyGroup,
      applyEndDate: twoSecondsLater,
    }]));
    given('theme', () => false);

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

    describe('When click theme button', () => {
      given('theme', () => false);

      it('should be calls change theme dispatch', () => {
        const { getByTestId } = renderStudyGroupsContainer();

        const button = getByTestId('theme-toggle');

        fireEvent.click(button);

        expect(dispatch).toBeCalledWith({
          type: 'common/changeTheme',
        });
      });
    });
  });

  context('without groups', () => {
    given('groups', () => ([]));
    given('theme', () => false);

    it('nothing group list text message', () => {
      const { container } = renderStudyGroupsContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
