import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import MockTheme from '../../common/test/MockTheme';
import ConfirmPasswordModal from './ConfirmPasswordModal';

describe('ConfirmPasswordModal', () => {
  const handleCancel = jest.fn();
  const handleConfirm = jest.fn();
  const handleChange = jest.fn();

  const renderConfirmPasswordModal = ({ visible }) => render((
    <MockTheme>
      <ConfirmPasswordModal
        password=""
        visible={visible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        handleChange={handleChange}
      />
    </MockTheme>
  ));

  context('Is visible', () => {
    it('should be render password confirm input and title', () => {
      const { container, getByLabelText } = renderConfirmPasswordModal({
        visible: true,
      });

      expect(container).toHaveTextContent('비밀번호 확인');
      expect(getByLabelText('password-confirm-input')).not.toBeNull();
    });

    it('should be listen call cancel event', () => {
      const { getByText } = renderConfirmPasswordModal({
        visible: true,
      });

      fireEvent.click(getByText('취소'));

      expect(handleCancel).toBeCalledTimes(1);
    });

    it('should be listen call confirm event', () => {
      const { getByText } = renderConfirmPasswordModal({
        visible: true,
      });

      fireEvent.submit(getByText('확인'));

      expect(handleConfirm).toBeCalledTimes(1);
    });

    it('should be listen call input change event', () => {
      const { getByLabelText } = renderConfirmPasswordModal({
        visible: true,
      });

      const input = getByLabelText('password-confirm-input');

      fireEvent.change(input, {
        target: { value: 'password' },
      });

      expect(handleChange).toBeCalledTimes(1);
    });
  });

  context("Isn't visible", () => {
    it('should be render password confirm input', () => {
      const { container } = renderConfirmPasswordModal({
        visible: false,
      });

      expect(container).toBeEmptyDOMElement();
    });
  });
});
