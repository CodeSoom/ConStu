import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import MockTheme from '../../common/test/MockTheme';
import ApplicationFormModal from './ApplicationFormModal';

describe('ApplicationFormModal', () => {
  const handleCancel = jest.fn();
  const handleConfirm = jest.fn();
  const handleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderApplicationFormModal = ({ visible, fields }) => render((
    <MockTheme>
      <ApplicationFormModal
        visible={visible}
        fields={fields}
        onChangeApply={handleChange}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </MockTheme>
  ));

  context('with visible', () => {
    context('with applyFields value', () => {
      const modal = {
        visible: true,
        fields: {
          reason: 'reason',
          wantToGet: 'wantToGet',
        },
      };

      it('renders Modal text', () => {
        const { container } = renderApplicationFormModal(modal);

        expect(container).toHaveTextContent('스터디 참여 신청서');
        expect(container).toHaveTextContent('신청하게 된 이유');
        expect(container).toHaveTextContent('스터디를 통해 얻고 싶은 것은 무엇인가요?');
      });

      it('calls confirm event action', () => {
        const { getByText } = renderApplicationFormModal(modal);

        const button = getByText('확인');

        fireEvent.click(button);

        expect(handleConfirm).toBeCalled();
      });

      it('calls cancel event action', () => {
        const { getByText } = renderApplicationFormModal(modal);

        const button = getByText('취소');

        fireEvent.click(button);

        expect(handleCancel).toBeCalled();
      });

      it('change apply form fields', () => {
        const { getByLabelText } = renderApplicationFormModal(modal);

        const input = getByLabelText('신청하게 된 이유');

        fireEvent.change(input, { target: { name: 'reason', value: '내용' } });

        expect(handleChange).toBeCalled();
      });
    });

    context('without applyFields value', () => {
      it("doesn't reason value", () => {
        const modal = {
          visible: true,
          fields: {
            reason: '',
            wantToGet: 'wantToGet',
          },
        };

        const { getByText, getByLabelText } = renderApplicationFormModal(modal);

        const button = getByText('확인');

        fireEvent.click(button);

        expect(handleConfirm).not.toBeCalled();

        expect(getByLabelText('신청하게 된 이유')).toHaveStyle('border: 1px solid #ff8787;');
      });

      it("doesn't wantToGet value", () => {
        const modal = {
          visible: true,
          fields: {
            reason: 'reason',
            wantToGet: '',
          },
        };

        const { getByText, getByLabelText } = renderApplicationFormModal(modal);

        const button = getByText('확인');

        fireEvent.click(button);

        expect(handleConfirm).not.toBeCalled();

        expect(getByLabelText('스터디를 통해 얻고 싶은 것은 무엇인가요?')).toHaveStyle('border: 1px solid #ff8787;');
      });
    });
  });

  context('without visible', () => {
    const modal = {
      visible: false,
      fields: {
        reason: '',
        wantToGet: '',
      },
    };

    it("doesn't renders Modal text", () => {
      const { container } = renderApplicationFormModal(modal);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
