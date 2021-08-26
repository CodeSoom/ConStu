import React from 'react';

import { render } from '@testing-library/react';

import FormModalWindow from './FormModalWindow';
import MockTheme from './test/MockTheme';

describe('FormModalWindow', () => {
  const handleConfirm = jest.fn();
  const handleCancel = jest.fn();

  const renderFormModalWindow = ({ visible, title }) => render((
    <MockTheme>
      <FormModalWindow
        visible={visible}
        title={title}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        <p>test</p>
      </FormModalWindow>
    </MockTheme>
  ));

  context('with visible', () => {
    const modal = {
      visible: true,
      title: '타이틀',
    };

    it('renders Modal text', () => {
      const { container } = renderFormModalWindow(modal);

      expect(container).toHaveTextContent('타이틀');
      expect(container).toHaveTextContent('test');
    });
  });

  context('without visible', () => {
    const modal = {
      visible: false,
      title: '타이틀',
    };

    it("doesn't renders Modal text", () => {
      const { container } = renderFormModalWindow(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
