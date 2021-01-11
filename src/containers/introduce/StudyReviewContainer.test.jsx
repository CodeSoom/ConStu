import React from 'react';

import { render } from '@testing-library/react';

import StudyReviewContainer from './StudyReviewContainer';

describe('StudyReviewContainer', () => {
  const renderStudyReviewContainer = () => render((
    <StudyReviewContainer />
  ));

  it('renders study group title and contents', () => {
    const { container } = renderStudyReviewContainer();

    expect(container).toHaveTextContent('스터디 후기를 작성해주세요!');
    expect(container).toHaveTextContent('후기 등록하기');
  });
});
