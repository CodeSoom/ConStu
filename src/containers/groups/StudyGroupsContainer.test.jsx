import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import StudyGroupsContainer from './StudyGroupsContainer';

describe('StudyGroupsContainer', () => {
  const dispatch = jest.fn();

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

  const renderStudyGroupsContainer = () => render((
    <MemoryRouter>
      <StudyGroupsContainer />
    </MemoryRouter>
  ));

  context('with groups', () => {
    given('groups', () => ([{
      id: 1,
      moderatorId: 'user1',
      title: '소개합니다.',
      participants: [],
      tags: ['JavaScript'],
    }]));

    it('renders groups title', () => {
      const { container } = renderStudyGroupsContainer();

      expect(container).toHaveTextContent('소개합니다.');
    });

    it('click event calls dispatch', () => {
      const { getByText } = renderStudyGroupsContainer();

      fireEvent.click(getByText('#JavaScript'));

      expect(dispatch).toBeCalled();
    });
  });

  context('without groups', () => {
    given('groups', () => ([]));

    it('nothing group list text message', () => {
      const { container } = renderStudyGroupsContainer();

      expect(container).toHaveTextContent('스터디가 존재하지 않습니다.');
    });
  });
});
