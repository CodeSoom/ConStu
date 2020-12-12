import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ParticipantListModal from './ParticipantListModal';

describe('ParticipantListModal', () => {
  const handleClose = jest.fn();
  const handleUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderParticipantListModal = ({ visible, participants }) => render((
    <ParticipantListModal
      visible={visible}
      participants={participants}
      onClose={handleClose}
      onUpdate={handleUpdate}
    />
  ));

  context('with visible', () => {
    const visible = true;

    context('with participants', () => {
      describe('Contents on the screen', () => {
        const participants = [{
          confirm: false,
          id: 'test',
        }];

        it('renders Modal text', () => {
          const { container } = renderParticipantListModal({ visible, participants });

          expect(container).toHaveTextContent('스터디 신청자 목록 🙋‍♂️');
          expect(container).toHaveTextContent('신청서 보기');
          expect(container).toHaveTextContent('test');
        });

        it('click button call close', () => {
          const { getByText } = renderParticipantListModal({ visible, participants });

          const button = getByText('닫기');

          fireEvent.click(button);

          expect(handleClose).toBeCalled();
        });
      });

      context('When confirm is true', () => {
        const participants = [{
          confirm: true,
          id: 'test',
        }];

        it('event is called with user ID after clicking cancel button', () => {
          const { getByText } = renderParticipantListModal({ visible, participants });

          const button = getByText('취소하기');

          fireEvent.click(button);

          expect(handleUpdate).toBeCalledWith('test');
        });
      });

      context('When confirm is false', () => {
        const participants = [{
          confirm: false,
          id: 'test',
        }];

        it('renders confirm button', () => {
          const { getByText } = renderParticipantListModal({ visible, participants });

          const button = getByText('승인하기');

          fireEvent.click(button);

          expect(handleUpdate).toBeCalledWith('test');
        });
      });
    });

    context('without participants', () => {
      const participants = [];

      it('renders "The applicant does not exist." text', () => {
        const { container } = renderParticipantListModal({ visible, participants });

        expect(container).toHaveTextContent('신청자가 존재하지 않습니다.');
      });
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
