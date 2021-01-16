import React from 'react';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import StudyReviewContainer from './StudyReviewContainer';

import STUDY_GROUP from '../../../fixtures/study-group';
import { yesterday } from '../../util/utils';

describe('StudyReviewContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementation((state) => state({
      groupReducer: {
        group: given.group,
      },
      authReducer: {
        user: given.user,
      },
    }));
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
