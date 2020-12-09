import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import STUDY_GROUP from '../../../fixtures/study-group';

import IntroduceContainer from './IntroduceContainer';

describe('IntroduceContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      authReducer: {
        user: given.user,
      },
      groupReducer: {
        group: given.group,
        applyFields: given.applyFields,
      },
    }));
  });

  const renderIntroduceContainer = ({ id }) => render((
    <MemoryRouter>
      <IntroduceContainer groupId={id} />
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
    given('applyFields', () => ({
      reason: '',
      wantToGet: '',
    }));

    it('renders study group title and contents', () => {
      const { container } = renderIntroduceContainer(1);

      expect(container).toHaveTextContent('스터디를 소개합니다. 1');
      expect(container).toHaveTextContent('우리는 이것저것 합니다.1');
    });

    it('call dispatch actions', () => {
      renderIntroduceContainer(1);

      expect(dispatch).toBeCalled();
    });
  });

  context('without group ', () => {
    given('group', () => (null));
    given('applyFields', () => ({
      reason: '',
      wantToGet: '',
    }));

    it('renders "loading.." text', () => {
      const { container } = renderIntroduceContainer(1);

      expect(container).toHaveTextContent('Loading...');
    });
  });

  context('with group & user', () => {
    given('group', () => (STUDY_GROUP));
    given('user', () => ('user'));
    given('applyFields', () => ({
      reason: 'reason',
      wantToGet: 'wantToGet',
    }));

    it('click event dispatches action call updateParticipant', () => {
      const { getByText } = renderIntroduceContainer(1);

      expect(dispatch).toBeCalledTimes(1);

      const button = getByText('신청하기');

      expect(button).not.toBeNull();

      fireEvent.click(button);

      fireEvent.click(getByText('확인'));

      expect(dispatch).toBeCalledTimes(2);
    });

    it('dispatches action calls changeApplyFields', () => {
      const form = {
        name: 'reason',
        value: '내용',
      };

      const { getByText, getByLabelText } = renderIntroduceContainer(1);

      expect(dispatch).toBeCalledTimes(1);

      const button = getByText('신청하기');

      fireEvent.click(button);

      const input = getByLabelText('신청하게 된 이유');

      fireEvent.change(input, { target: form });

      expect(dispatch).toBeCalledWith({
        type: 'group/changeApplyFields',
        payload: form,
      });
    });
  });

  describe(`When the application date is earlier than the deadline 
    date and the application deadline is not reached`, () => {
    const nowDate = new Date();
    const tomorrow = nowDate.setDate(nowDate.getDate() + 1);

    const group = {
      ...STUDY_GROUP,
      applyEndDate: tomorrow,
      participants: [
        { id: 'user2' },
        { id: 'user' },
      ],
      personnel: 3,
    };

    given('group', () => (group));
    given('user', () => ('user'));
    given('applyFields', () => ({
      reason: '',
      wantToGet: '',
    }));

    context('click confirm', () => {
      it('click event dispatches action call deleteParticipant', () => {
        const { getByText } = renderIntroduceContainer(1);

        expect(dispatch).toBeCalledTimes(1);

        const button = getByText('신청 취소');

        expect(button).not.toBeNull();

        fireEvent.click(button);

        fireEvent.click(getByText('확인'));

        expect(dispatch).toBeCalledTimes(2);
      });
    });

    context('click cancel', () => {
      it("doesn't click event dispatches action call deleteParticipant", () => {
        const { getByText } = renderIntroduceContainer(1);

        expect(dispatch).toBeCalledTimes(1);

        const button = getByText('신청 취소');

        expect(button).not.toBeNull();

        fireEvent.click(button);

        fireEvent.click(getByText('취소'));

        expect(dispatch).toBeCalledTimes(1);
      });
    });
  });
});
