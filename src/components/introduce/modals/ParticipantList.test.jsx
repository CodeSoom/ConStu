import React from 'react';

import { render } from '@testing-library/react';

import ParticipantList from './ParticipantList';

describe('ParticipantList', () => {
  const renderParticipantList = ({ id, confirm }) => render((
    <ParticipantList
      id={id}
      confirm={confirm}
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
});
