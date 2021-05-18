import React from 'react';

import { render } from '@testing-library/react';

import AskLoginModal from './AskLoginModal';
import MockTheme from '../../common/test/MockTheme';

describe('AskLoginModal', () => {
  const handleCancel = jest.fn();

  const renderAskLoginModal = ({ visible }) => render((
    <MockTheme>
      <AskLoginModal
        visible={visible}
        onCancel={handleCancel}
      />
    </MockTheme>
  ));

  context('with visible', () => {
    const modal = {
      visible: true,
    };

    it('renders Modal text', () => {
      const { container } = renderAskLoginModal(modal);

      expect(container).toHaveTextContent('신청 실패');
      expect(container).toHaveTextContent('로그인 후 신청 가능합니다.');
    });
  });

  context('without visible', () => {
    const modal = {
      visible: false,
    };

    it("doesn't renders Modal text", () => {
      const { container } = renderAskLoginModal(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
