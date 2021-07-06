import React from 'react';

import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '@testing-library/react';

import MockTheme from '../../common/test/MockTheme';
import ApplicationFormModal from './ApplicationFormModal';

describe('ApplicationFormModal', () => {
  const handleCancel = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderApplicationFormModal = ({ visible }) => render((
    <MockTheme>
      <ApplicationFormModal
        visible={visible}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </MockTheme>
  ));

  context('with visible', () => {
    context('with applyFields value', () => {
      const visible = {
        visible: true,
      };

      it('renders Modal text', () => {
        const { container } = renderApplicationFormModal(visible);

        expect(container).toHaveTextContent('스터디 참여 신청서');
        expect(container).toHaveTextContent('신청하게 된 이유');
        expect(container).toHaveTextContent('스터디를 통해 얻고 싶은 것은 무엇인가요?');
      });

      it('calls submit event action', async () => {
        const textareaFixtures = [
          { label: '신청하게 된 이유', name: 'reason', value: '내용' },
          { label: '스터디를 통해 얻고 싶은 것은 무엇인가요?', name: 'wantToGet', value: '내용' },
        ];

        const { getByText, getByLabelText } = renderApplicationFormModal(visible);

        textareaFixtures.forEach(({ label, name, value }) => {
          const textarea = getByLabelText(label);

          fireEvent.change(textarea, { target: { name, value } });
        });

        await act(async () => {
          fireEvent.submit(getByText('확인'));
        });

        expect(handleSubmit).toBeCalled();
      });

      it('calls cancel event action', () => {
        const { getByText } = renderApplicationFormModal(visible);

        const button = getByText('취소');

        fireEvent.click(button);

        expect(handleCancel).toBeCalled();
      });
    });

    context('without applyFields value', () => {
      const visible = {
        visible: true,
      };
      it("doesn't reason value", async () => {
        const { getByText, getByLabelText } = renderApplicationFormModal(visible);

        const textarea = getByLabelText('스터디를 통해 얻고 싶은 것은 무엇인가요?');

        fireEvent.change(textarea, { target: { name: 'wantToGet', value: '내용' } });

        await act(async () => {
          fireEvent.submit(getByText('확인'));
        });

        expect(handleSubmit).not.toBeCalled();
        expect(getByLabelText('신청하게 된 이유')).toHaveStyle('border: 1px solid #ff8787;');
      });

      it("doesn't wantToGet value", async () => {
        const { getByText, getByLabelText } = renderApplicationFormModal(visible);

        const textarea = getByLabelText('신청하게 된 이유');

        fireEvent.change(textarea, { target: { name: 'reason', value: '내용' } });

        await act(async () => {
          fireEvent.submit(getByText('확인'));
        });

        expect(handleSubmit).not.toBeCalled();
        expect(getByLabelText('스터디를 통해 얻고 싶은 것은 무엇인가요?')).toHaveStyle('border: 1px solid #ff8787;');
      });
    });
  });

  context('without visible', () => {
    const visible = {
      visible: false,
    };

    it("doesn't renders Modal text", () => {
      const { container } = renderApplicationFormModal(visible);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
