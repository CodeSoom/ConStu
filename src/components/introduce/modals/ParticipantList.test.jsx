import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ParticipantList from './ParticipantList';

describe('ParticipantList', () => {
  const renderParticipantList = (participant) => render((
    <ParticipantList
      participant={participant}
    />
  ));

  context('with confirm', () => {
    const props = {
      id: 'test',
      confirm: true,
    };

    it('renders cancel button', () => {
      const { container } = renderParticipantList(props);

      expect(container).toHaveTextContent(props.id);
      expect(container).toHaveTextContent('취소하기');
    });
  });

  context('without confirm', () => {
    const props = {
      id: 'test',
      confirm: false,
    };

    it('renders confirm button', () => {
      const { container } = renderParticipantList(props);

      expect(container).toHaveTextContent(props.id);
      expect(container).toHaveTextContent('승인하기');
    });
  });

  describe('click "View application" button', () => {
    const participant = {
      id: 'test',
      reason: 'reason',
      wantToGet: 'wantToGet',
      confirm: false,
    };

    it("renders Applicant's application", () => {
      const { container, getByText } = renderParticipantList(participant);

      const button = getByText('신청서 보기');

      fireEvent.click(button);

      const { reason, wantToGet } = participant;

      expect(container).toHaveTextContent(reason);
      expect(container).toHaveTextContent(wantToGet);
    });

    it('close button click', () => {
      const { container, getByText } = renderParticipantList(participant);

      const button = getByText('신청서 보기');

      fireEvent.click(button);

      fireEvent.click(getByText('닫기'));

      const { reason, wantToGet } = participant;

      expect(container).not.toHaveTextContent(reason);
      expect(container).not.toHaveTextContent(wantToGet);
    });
  });
});
