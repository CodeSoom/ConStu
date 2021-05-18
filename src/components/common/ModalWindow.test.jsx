import React from 'react';

import { render } from '@testing-library/react';

import ModalWindow from './ModalWindow';
import MockTheme from './test/MockTheme';

describe('ModalWindow', () => {
  const handleConfirm = jest.fn();
  const handleCancel = jest.fn();

  const renderModalWindow = ({ visible, title, description }) => render((
    <MockTheme>
      <ModalWindow
        visible={visible}
        title={title}
        description={description}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </MockTheme>
  ));

  context('with visible', () => {
    const modal = {
      visible: true,
      title: '타이틀',
      description: '내용',
    };

    it('renders Modal text', () => {
      const { container } = renderModalWindow(modal);

      expect(container).toHaveTextContent('타이틀');
      expect(container).toHaveTextContent('내용');
    });
  });

  context('without visible', () => {
    const modal = {
      visible: false,
      title: '타이틀',
      description: '내용',
    };

    it("doesn't renders Modal text", () => {
      const { container } = renderModalWindow(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
