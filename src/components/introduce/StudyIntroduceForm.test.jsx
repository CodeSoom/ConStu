import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import StudyIntroduceForm from './StudyIntroduceForm';

import STUDY_GROUP from '../../../fixtures/study-group';

describe('StudyIntroduceForm', () => {
  const renderStudyIntroduceForm = ({ group }) => render((
    <MemoryRouter>
      <StudyIntroduceForm
        group={group}
      />
    </MemoryRouter>
  ));

  it('renders study group title and contents', () => {
    const { container } = renderStudyIntroduceForm({ group: STUDY_GROUP });

    expect(container).toHaveTextContent('스터디를 소개합니다.2');
    expect(container).toHaveTextContent('우리는 이것저것 합니다.2');
  });

  it('renders links of tags', () => {
    const { container } = renderStudyIntroduceForm({ group: STUDY_GROUP });

    expect(container.innerHTML).toContain('<a ');
  });
});
