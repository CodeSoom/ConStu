import React from 'react';

import { render } from '@testing-library/react';

import StudyReviewForm from './StudyReviewForm';

import { yesterday } from '../../util/utils';
import STUDY_GROUP from '../../../fixtures/study-group';

describe('StudyReviewForm', () => {
  const renderStudyReviewForm = ({ group, time, user }) => render((
    <StudyReviewForm
      group={group}
      time={time}
      user={user}
    />
  ));

  context('with user', () => {
    describe('User is not moderator and applyEndDate is Deadline', () => {
      const info = {
        group: {
          ...STUDY_GROUP,
          applyEndDate: yesterday,
        },
        time: Date.now(),
        user: 'user1',
      };

      it('renders study review form', () => {
        const { container } = renderStudyReviewForm(info);

        expect(container).toHaveTextContent('스터디 후기를 작성해주세요!');
      });
    });

    describe('User is moderator', () => {
      const info = {
        group: {
          ...STUDY_GROUP,
          applyEndDate: yesterday,
        },
        time: Date.now(),
        user: 'user2',
      };

      it('nothing renders study review form', () => {
        const { container } = renderStudyReviewForm(info);

        expect(container).toBeEmptyDOMElement();
      });
    });
  });

  context('without user', () => {
    const info = {
      group: {
        ...STUDY_GROUP,
        applyEndDate: yesterday,
      },
      time: Date.now(),
      user: null,
    };

    it('nothing renders study review form', () => {
      const { container } = renderStudyReviewForm(info);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
