import React from 'react';

import { render } from '@testing-library/react';

import StudyGroups from './StudyGroups';

describe('StudyGroups', () => {
  const renderStudyGroups = ({ groups }) => render((
    <StudyGroups
      groups={groups}
    />
  ));

  it('nothing render menu list', () => {
    const groups = [
      {
        id: 1,
        moderatorId: 'user1',
        title: '스터디를 소개합니다. 1',
      },
    ];

    const { container } = renderStudyGroups({ groups });

    expect(container).toHaveTextContent('스터디를 소개합니다. 1');
  });
});
