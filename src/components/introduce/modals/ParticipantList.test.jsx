import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ParticipantList from './ParticipantList';
import MockTheme from '../../common/test/MockTheme';

describe('ParticipantList', () => {
  const handleUpdate = jest.fn();

  beforeEach(() => {
    handleUpdate.mockClear();
  });

  const renderParticipantList = (participant) => render((
    <MockTheme>
      <ParticipantList
        participant={participant}
        onUpdate={handleUpdate}
      />
    </MockTheme>
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

    it('click cancel button', () => {
      const { getByText } = renderParticipantList(props);

      const button = getByText('취소하기');

      fireEvent.click(button);

      expect(handleUpdate).toBeCalled();
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

    it('click confirm button', () => {
      const { getByText } = renderParticipantList(props);

      const button = getByText('승인하기');

      fireEvent.click(button);

      expect(handleUpdate).toBeCalled();
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
