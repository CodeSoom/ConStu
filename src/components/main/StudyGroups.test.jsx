import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import StudyGroups from './StudyGroups';

import STUDY_GROUPS from '../../../fixtures/study-groups';

describe('StudyGroups', () => {
  const renderStudyGroups = ({ groups }) => render((
    <MemoryRouter>
      <StudyGroups
        groups={groups}
      />
    </MemoryRouter>
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
