import React from 'react';

import { render } from '@testing-library/react';

import StudyListPage from './StudyListPage';

describe('StudyListPage', () => {
  const renderStudyListPage = () => render(
    <StudyListPage />,
  );

  it('renders StudyList Title', () => {
    const { container } = renderStudyListPage();

    expect(container).toHaveTextContent('스터디 목록');
  });
});
