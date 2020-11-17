import React from 'react';

import { render } from '@testing-library/react';

import StudyIntroducePage from './StudyIntroducePage';

describe('StudyIntroducePage', () => {
  const renderStudyIntroducePage = () => render(
    <StudyIntroducePage />,
  );

  it('renders Study Introduce Title', () => {
    const { container } = renderStudyIntroducePage();

    expect(container).toHaveTextContent('스터디 소개');
  });
});
