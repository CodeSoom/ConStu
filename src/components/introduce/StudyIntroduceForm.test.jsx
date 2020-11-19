import React from 'react';

import { render } from '@testing-library/react';

import StudyIntroduceForm from './StudyIntroduceForm';

describe('StudyIntroduceForm', () => {
  const renderStudyIntroduceForm = ({ group }) => render((
    <StudyIntroduceForm
      group={group}
    />
  ));

  it('renders study group title and contents', () => {
    const group = {
      id: 1,
      moderatorId: 'user1',
      title: '스터디를 소개합니다. 1',
      personnel: 5,
      applyEndDate: null,
      applyStartDate: null,
      contents: '우리는 스터디합니다.',
      tags: [],
    };

    const { container } = renderStudyIntroduceForm({ group });

    expect(container).toHaveTextContent('스터디를 소개합니다. 1');
    expect(container).toHaveTextContent('우리는 스터디합니다.');
  });
});
