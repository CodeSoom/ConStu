import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import { twoSecondsLater, tomorrow } from '../../util/utils';

import STUDY_GROUP from '../../../fixtures/study-group';

import IntroduceHeaderContainer from './IntroduceHeaderContainer';
import MockTheme from '../../components/common/test/MockTheme';

describe('IntroduceHeaderContainer', () => {
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

  const renderIntroduceHeaderContainer = () => render((
    <MockTheme>
      <MemoryRouter>
        <IntroduceHeaderContainer />
      </MemoryRouter>
    </MockTheme>
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

    it('renders study group title', () => {
      const { container } = renderIntroduceHeaderContainer();

      expect(container).toHaveTextContent('스터디를 소개합니다. 1');
    });
  });

  context('without group ', () => {
    given('group', () => (null));
    given('applyFields', () => ({
      reason: '',
      wantToGet: '',
    }));

    it('Nothing renders group contents', () => {
      const { container } = renderIntroduceHeaderContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('When the logged-in user is not the author', () => {
    context('with group & user', () => {
      given('group', () => (STUDY_GROUP));
      given('user', () => ('user'));
      given('applyFields', () => ({
        reason: 'reason',
        wantToGet: 'wantToGet',
      }));

      it('click event dispatches action call updateParticipant', () => {
        const { getByText } = renderIntroduceHeaderContainer();

        const button = getByText('신청하기');

        expect(button).not.toBeNull();

        fireEvent.click(button);

        fireEvent.click(getByText('확인'));

        expect(dispatch).toBeCalledTimes(1);
      });

      it('dispatches action calls changeApplyFields', () => {
        const form = {
          name: 'reason',
          value: '내용',
        };

        const { getByText, getByLabelText } = renderIntroduceHeaderContainer();

        const button = getByText('신청하기');

        fireEvent.click(button);

        const input = getByLabelText('신청하게 된 이유');

        fireEvent.change(input, { target: form });

        expect(dispatch).toBeCalledWith({
          type: 'group/changeApplyFields',
          payload: form,
        });
      });

      it('click cancel dispatches call action clearApplyFields', () => {
        const { getByText } = renderIntroduceHeaderContainer();

        const button = getByText('신청하기');

        expect(button).not.toBeNull();

        fireEvent.click(button);

        fireEvent.click(getByText('취소'));

        expect(dispatch).toBeCalledWith({
          type: 'group/clearApplyFields',
        });
      });
    });

    describe(`When the application date is earlier than the deadline 
      date and the application deadline is not reached`, () => {
      const group = {
        ...STUDY_GROUP,
        applyEndDate: tomorrow,
        participants: [
          { id: 'user2' },
          { id: 'user', confirm: false },
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
          const { getByText } = renderIntroduceHeaderContainer();

          const button = getByText('신청 취소');

          expect(button).not.toBeNull();

          fireEvent.click(button);

          fireEvent.click(getByText('확인'));

          expect(dispatch).toBeCalledTimes(1);
        });
      });

      context('click cancel', () => {
        it("doesn't click event dispatches action call deleteParticipant", () => {
          const { getByText } = renderIntroduceHeaderContainer();

          const button = getByText('신청 취소');

          expect(button).not.toBeNull();

          fireEvent.click(button);

          fireEvent.click(getByText('취소'));

          expect(dispatch).not.toBeCalled();
        });
      });
    });
  });

  context('When the logged-in user is the author', () => {
    given('group', () => ({
      ...STUDY_GROUP,
      applyEndDate: twoSecondsLater,
      participants: [
        {
          confirm: true,
          id: 'test1',
        },
        {
          confirm: false,
          id: 'test2',
        },
      ],
    }));
    given('user', () => ('user2'));
    given('applyFields', () => ({
      reason: '',
      wantToGet: '',
    }));

    describe('Click "Approve to participate in the study" button and then click "Approve" button', () => {
      it('dispatches call action "updateConfirmParticipant"', () => {
        const { getByText } = renderIntroduceHeaderContainer();

        const button = getByText('스터디 참여 승인하기');

        expect(button).not.toBeNull();

        fireEvent.click(button);

        fireEvent.click(getByText('승인하기'));

        expect(dispatch).toBeCalled();
      });
    });
  });
});
