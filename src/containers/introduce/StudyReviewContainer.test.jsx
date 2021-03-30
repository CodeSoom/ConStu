import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import STUDY_GROUP from '../../../fixtures/study-group';
import { yesterday } from '../../util/utils';

import StudyReviewContainer from './StudyReviewContainer';

describe('StudyReviewContainer', () => {
  const dispatch = jest.fn();

  jest.useFakeTimers();

  beforeEach(() => {
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

  afterEach(() => {
    jest.clearAllTimers();
  });

  const renderStudyReviewContainer = () => render((
    <StudyReviewContainer />
  ));

  context('with login and group', () => {
    given('group', () => ({
      ...STUDY_GROUP,
      participants: [{
        id: 'user1',
        confirm: true,
      }],
      applyEndDate: yesterday,
    }));
    given('user', () => ('user1'));

    describe('When you are an approved applicant', () => {
      it('renders study review form', () => {
        const { container } = renderStudyReviewContainer();

        expect(container).toHaveTextContent('스터디 후기를 작성해주세요!');
      });
    });

    it('dispatch actions call changeStudyReviewFields', () => {
      const form = {
        name: 'review',
        value: '후기입니다.',
      };

      const { getByPlaceholderText } = renderStudyReviewContainer();

      const textarea = getByPlaceholderText('후기를 입력해주세요!');

      fireEvent.change(textarea, { target: form });

      expect(dispatch).toBeCalledWith({
        type: 'group/changeStudyReviewFields',
        payload: form,
      });
    });

    describe('Click the button to submit for study review', () => {
      it('dispatch actions call setStudyReview', () => {
        const { getByText } = renderStudyReviewContainer();

        fireEvent.click(getByText('후기 등록하기'));

        expect(dispatch).toBeCalledTimes(1);
      });
    });
  });

  context('without login and group', () => {
    given('user', () => (null));
    given('group', () => (null));

    it('nothing renders review form', () => {
      const { container } = renderStudyReviewContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
