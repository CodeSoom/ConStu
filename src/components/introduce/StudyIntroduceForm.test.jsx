import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import StudyIntroduceForm from './StudyIntroduceForm';

import STUDY_GROUP from '../../../fixtures/study-group';

describe('StudyIntroduceForm', () => {
  const renderStudyIntroduceForm = ({ group, time }) => render((
    <MemoryRouter>
      <StudyIntroduceForm
        group={group}
        realTime={time}
      />
    </MemoryRouter>
  ));

  it('renders createDate text', () => {
    const { container } = renderStudyIntroduceForm({ group: STUDY_GROUP });

    expect(container).toHaveTextContent('2020년 12월 06일');
  });

  it('renders links of tags', () => {
    const { container } = renderStudyIntroduceForm({ group: STUDY_GROUP });

    expect(container.innerHTML).toContain('<a ');
  });
});
