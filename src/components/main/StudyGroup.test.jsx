import React from 'react';

import { render } from '@testing-library/react';

import StudyGroup from './StudyGroup';

describe('StudyGroup', () => {
  const renderStudyGroup = ({ group }) => render((
    <StudyGroup
      group={group}
    />
  ));

  it('renders study group text contents', () => {
    const group = {
      id: 1,
      moderatorId: 'user1',
      title: '스터디를 소개합니다. 1',
      personnel: 5,
      applyEndDate: null,
      applyStartDate: null,
    };

    const { container } = renderStudyGroup({ group });

    expect(container).toHaveTextContent('스터디를 소개합니다. 1');
    expect(container).toHaveTextContent('user1');
  });
});
