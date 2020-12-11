import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ApplicationViewModal from './ApplicationViewModal';

describe('ApplicationViewModal', () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderApplicationViewModal = ({ visible, participant }) => render((
    <ApplicationViewModal
      visible={visible}
      participant={participant}
      onClose={handleClose}
    />
  ));

  context('with visible', () => {
    const modal = {
      visible: true,
      participant: {
        id: 'test',
        reason: 'reason',
        wantToGet: 'wantToGet',
      },
    };

    it('renders Modal text', () => {
      const { container } = renderApplicationViewModal(modal);

      const { participant } = modal;

      expect(container).toHaveTextContent(`${participant.id} 신청서 📚`);
      expect(container).toHaveTextContent('신청하게 된 이유');
      expect(container).toHaveTextContent('스터디를 통해 얻고 싶은 것은 무엇인가요?');
    });

    it('calls confirm event action', () => {
      const { getByText } = renderApplicationViewModal(modal);

      const button = getByText('닫기');

      fireEvent.click(button);

      expect(handleClose).toBeCalled();
    });
  });

  context('without visible', () => {
    const modal = {
      visible: false,
      participant: {
        reason: '',
        wantToGet: '',
      },
    };

    it("doesn't renders Modal text", () => {
      const { container } = renderApplicationViewModal(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
