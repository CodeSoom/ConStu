import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '@testing-library/react';

import { twoSecondsLater } from '../../util/utils';

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

  jest.useFakeTimers();

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

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderIntroduceFormContainer = () => render((
    <MemoryRouter>
      <IntroduceFormContainer />
    </MemoryRouter>
  ));

  const group = {
    id: 1,
    moderatorId: 'user1',
    title: '스터디를 소개합니다. 1',
    personnel: 7,
    participants: [],
    applyEndDate: twoSecondsLater,
    contents: '우리는 이것저것 합니다.1',
    tags: [
      'JavaScript',
      'React',
      'Algorithm',
    ],
  };

  context('with group', () => {
    given('group', () => (group));

    it('renders study group title and contents', () => {
      const { container } = renderIntroduceFormContainer(1);

      expect(container).toHaveTextContent('우리는 이것저것 합니다.1');
    });

    it('click delete button call dispatch action', () => {
      const { getByText } = renderIntroduceFormContainer(1);

      const button = getByText('삭제');

      expect(button).not.toBeNull();

      fireEvent.click(button);

      fireEvent.click(getByText('확인'));

      expect(dispatch).toBeCalled();

      expect(mockPush).toBeCalledWith('/');
    });

    it('click edit button call dispatch action', () => {
      const { getByText } = renderIntroduceFormContainer(1);

      const button = getByText('수정');

      expect(button).not.toBeNull();

      fireEvent.click(button);

      expect(dispatch).toBeCalledWith({
        type: 'group/setOriginalArticle',
        payload: group,
      });

      expect(mockPush).toBeCalledWith('/write');
    });

    it('The status changes to the deadline for recruitment after 2 seconds.', async () => {
      const { container } = renderIntroduceFormContainer(1);

      expect(container).toHaveTextContent(/몇 초 후 모집 마감/i);

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(container).toHaveTextContent(/모집 마감/i);
    });
  });

  context('without group ', () => {
    given('group', () => (null));

    it('nothing renders', () => {
      const { container } = renderIntroduceFormContainer(1);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
