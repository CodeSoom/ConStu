import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import STUDY_GROUP from '../../../fixtures/study-group';

import ReviewContainer from './ReviewContainer';
import { yesterday, tomorrow } from '../../util/utils';

describe('ReviewContainer', () => {
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllTimers();
  });

  beforeEach(() => {
    jest.useFakeTimers();

    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      groupReducer: {
        group: given.group,
        studyReviewFields: {
          rating: 3,
          review: '',
        },
      },
      authReducer: {
        user: given.user,
      },
    }));
  });

  const renderReviewContainer = () => render((
    <ReviewContainer />
  ));

  it('When there are no reviews, renders nothing review message', () => {
    given('group', () => ({
      moderatorId: 'user2',
      personnel: 3,
      participants: [
        { id: 'user2' },
        {
          id: 'user1',
          confirm: true,
        },
      ],
      applyEndDate: yesterday,
    }));
    given('user', () => ('user1'));

    const { container } = renderReviewContainer();

    expect(container).toHaveTextContent('아직 리뷰가 존재하지 않습니다!');
  });

  context('with login and group', () => {
    given('user', () => ('user1'));

    context("when apply end date isn't DeadLine", () => {
      given('group', () => ({
        ...STUDY_GROUP,
        personnel: 3,
        participants: [
          { id: 'user2' },
          {
            id: 'user1',
            confirm: true,
          },
        ],
        applyEndDate: tomorrow,
        reviews: [{
          id: 'user1',
          rating: 3,
          content: 'test review',
          createdDate: new Date(),
        }],
      }));

      it('Nothing renders study review form', () => {
        const { container } = renderReviewContainer();

        expect(container).toBeEmptyDOMElement();
      });
    });

    context('when apply end date is DeadLine', () => {
      given('group', () => ({
        ...STUDY_GROUP,
        personnel: 3,
        participants: [
          { id: 'user2' },
          {
            id: 'user1',
            confirm: true,
          },
        ],
        applyEndDate: yesterday,
        reviews: [{
          id: 'user1',
          rating: 3,
          content: 'test review',
          createdDate: new Date(),
        }],
      }));

      describe('When you are an approved applicant', () => {
        it('renders study review form', () => {
          const { container } = renderReviewContainer();

          expect(container).toHaveTextContent('스터디 후기를 작성해주세요!');
        });
      });

      it('dispatch actions call changeStudyReviewFields', () => {
        const form = {
          name: 'review',
          value: '후기입니다.',
        };

        const { getByPlaceholderText } = renderReviewContainer();

        const textarea = getByPlaceholderText('후기를 입력해주세요!');

        fireEvent.change(textarea, { target: form });

        expect(dispatch).toBeCalledWith({
          type: 'group/changeStudyReviewFields',
          payload: form,
        });
      });

      describe('Click the button to submit for study review', () => {
        it('dispatch actions call setStudyReview', () => {
          const { getByText } = renderReviewContainer();

          fireEvent.click(getByText('후기 등록하기'));

          expect(dispatch).toBeCalledTimes(1);
        });
      });

      describe('Renders Review List', () => {
        it('Information about the study review is render', () => {
          const { container } = renderReviewContainer();

          expect(container).toHaveTextContent('test review');
        });
      });
    });
  });

  context('without login and group', () => {
    given('user', () => (null));
    given('group', () => (null));

    it('nothing renders review form', () => {
      const { container } = renderReviewContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
