import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import IntroduceFormContainer from './IntroduceFormContainer';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('IntroduceFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockPush.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      groupReducer: {
        group: given.group,
        applyFields: given.applyFields,
      },
      authReducer: {
        user: 'user1',
      },
    }));
  });

  const renderIntroduceContainer = () => render((
    <MemoryRouter>
      <IntroduceFormContainer />
    </MemoryRouter>
  ));

  context('with group', () => {
    given('group', () => ({
      id: 1,
      moderatorId: 'user1',
      title: '스터디를 소개합니다. 1',
      personnel: 7,
      participants: [],
      contents: '우리는 이것저것 합니다.1',
      tags: [
        'JavaScript',
        'React',
        'Algorithm',
      ],
    }));

    it('renders study group title and contents', () => {
      const { container } = renderIntroduceContainer(1);

      expect(container).toHaveTextContent('우리는 이것저것 합니다.1');
    });

    it('click delete button call dispatch action', () => {
      const { getByText } = renderIntroduceContainer(1);

      const button = getByText('삭제');

      expect(button).not.toBeNull();

      fireEvent.click(button);

      expect(dispatch).toBeCalled();

      expect(mockPush).toBeCalledWith('/');
    });
  });

  context('without group ', () => {
    given('group', () => (null));

    it('nothing renders', () => {
      const { container } = renderIntroduceContainer(1);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
