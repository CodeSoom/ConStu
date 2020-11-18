import React from 'react';

import { render } from '@testing-library/react';

import StudyGroups from './StudyGroups';

import STUDY_GROUPS from '../../../fixtures/study-groups';

describe('StudyGroups', () => {
  const renderStudyGroups = ({ groups }) => render((
    <StudyGroups
      groups={groups}
    />
  ));

  it('renders study group list text contents', () => {
    const { container } = renderStudyGroups({ groups: STUDY_GROUPS });

    STUDY_GROUPS.forEach(({ moderatorId, title, personnel }) => {
      expect(container).toHaveTextContent(title);
      expect(container).toHaveTextContent(personnel);
      expect(container).toHaveTextContent(moderatorId);
    });
  });
});
