import React from 'react';

import { render } from '@testing-library/react';

import ModeratorViewButton from './ModeratorViewButton';

import STUDY_GROUP from '../../../fixtures/study-group';

describe('ModeratorViewButton', () => {
  const renderModeratorViewButton = ({ group, user }) => render((
    <ModeratorViewButton
      user={user}
      group={group}
    />
  ));

  context('When the organizer and the logged-in user are different', () => {
    const group = {
      ...STUDY_GROUP,
      moderatorId: 'user',
    };

    it('nothing renders', () => {
      const { container } = renderModeratorViewButton({ group, user: 'user1' });

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('When the host and logged in user are the same', () => {
    const group = {
      ...STUDY_GROUP,
      moderatorId: 'user',
    };

    it('nothing renders', () => {
      const { container } = renderModeratorViewButton({ group, user: 'user' });

      expect(container).toHaveTextContent('스터디 참여 승인하기');
    });
  });
});
