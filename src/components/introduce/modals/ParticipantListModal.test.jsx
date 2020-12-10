import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ParticipantListModal from './ParticipantListModal';

describe('ParticipantListModal', () => {
  const handleClose = jest.fn();

  const renderParticipantListModal = ({ visible, participants }) => render((
    <ParticipantListModal
      visible={visible}
      participants={participants}
      onClose={handleClose}
    />
  ));

  context('with visible', () => {
    const modal = {
      visible: true,
      participants: [{
        confirm: false,
        id: 'test',
      }],
    };

    it('renders Modal text', () => {
      const { container } = renderParticipantListModal(modal);

      expect(container).toHaveTextContent('스터디 신청자 목록 🙋‍♂️');
      expect(container).toHaveTextContent('신청서 보기');
      expect(container).toHaveTextContent('test');
    });

    it('click button call close', () => {
      const { getByText } = renderParticipantListModal(modal);

      const button = getByText('닫기');

      fireEvent.click(button);

      expect(handleClose).toBeCalled();
    });
  });

  context('without visible', () => {
    const modal = {
      visible: false,
    };

    it("doesn't renders Modal text", () => {
      const { container } = renderParticipantListModal(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
