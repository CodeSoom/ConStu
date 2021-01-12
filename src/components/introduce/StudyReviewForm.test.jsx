import React from 'react';

import { render } from '@testing-library/react';

import StudyReviewForm from './StudyReviewForm';

describe('StudyReviewForm', () => {
  const renderStudyReviewForm = () => render((
    <StudyReviewForm />
  ));

  it('renders study review form text', () => {
    const { container, getByPlaceholderText } = renderStudyReviewForm();

    expect(container).toHaveTextContent('스터디 후기를 작성해주세요!');
    expect(container).toHaveTextContent('후기 등록하기');
    expect(getByPlaceholderText('후기를 입력해주세요!')).not.toBeNull();
  });
});
