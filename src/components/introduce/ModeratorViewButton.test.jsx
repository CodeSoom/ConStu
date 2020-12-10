import React from 'react';

import { fireEvent, render } from '@testing-library/react';

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
      participants: [
        {
          confirm: true,
          id: 'test1',
        },
        {
          confirm: false,
          id: 'test2',
        },
      ],
    };

    it('renders button', () => {
      const { container } = renderModeratorViewButton({ group, user: 'user' });

      expect(container).toHaveTextContent('스터디 참여 승인하기');
    });

    it('click button and renders List of study applicants', () => {
      const { getByText, container } = renderModeratorViewButton({ group, user: 'user' });
      const button = getByText('스터디 참여 승인하기');

      fireEvent.click(button);

      expect(container).toHaveTextContent('스터디 신청자 목록');
    });

    it('Clicking the close button closes the modal window.', () => {
      const { getByText, container } = renderModeratorViewButton({ group, user: 'user' });
      const button = getByText('스터디 참여 승인하기');

      fireEvent.click(button);

      fireEvent.click(getByText('닫기'));

      expect(container).not.toHaveTextContent('스터디 신청자 목록');
    });
  });
});
