import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import StudyReviewForm from './StudyReviewForm';

import { yesterday } from '../../util/utils';
import STUDY_GROUP from '../../../fixtures/study-group';

describe('StudyReviewForm', () => {
  const handleChange = jest.fn();

  const reviewForm = { rating: 3, review: '' };

  const renderStudyReviewForm = ({
    group, time, user, fields = reviewForm,
  }) => render((
    <StudyReviewForm
      group={group}
      time={time}
      user={user}
      fields={fields}
      onChangeReview={handleChange}
    />
  ));

  const userStatusSetting = ({ user, participants }) => ({
    group: {
      ...STUDY_GROUP,
      participants,
      applyEndDate: yesterday,
    },
    time: Date.now(),
    user,
  });

  context('with user', () => {
    describe('When the user is approved applicant and applyEndDate is Deadline', () => {
      it('renders study review form', () => {
        const { container } = renderStudyReviewForm(userStatusSetting({
          participants: [{ id: 'user1', confirm: true }],
          user: 'user1',
        }));
        expect(container).toHaveTextContent('스터디 후기를 작성해주세요!');
      });
      it('call event change review form', () => {
        const { getByPlaceholderText } = renderStudyReviewForm(userStatusSetting({
          participants: [{ id: 'user1', confirm: true }],
          user: 'user1',
        }));

        const textarea = getByPlaceholderText('후기를 입력해주세요!');

        fireEvent.change(textarea, {
          target: {
            name: 'review',
            value: 'test',
          },
        });

        expect(handleChange).toBeCalled();
      });
    });

    describe('When the user is not approved applicant', () => {
      it('nothing renders study review form', () => {
        const { container } = renderStudyReviewForm(userStatusSetting({
          participants: [],
          user: 'user2',
        }));

        expect(container).toBeEmptyDOMElement();
      });
    });
  });

  context('without user', () => {
    it('nothing renders study review form', () => {
      const { container } = renderStudyReviewForm(userStatusSetting({
        participants: [],
        user: null,
      }));

      expect(container).toBeEmptyDOMElement();
    });
  });
});
