import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import IntroduceActionButtons from './IntroduceActionButtons';

describe('IntroduceActionButtons', () => {
  const handleRemove = jest.fn();

  beforeEach(() => {
    handleRemove.mockClear();
  });

  const renderIntroduceActionButtons = () => render((
    <IntroduceActionButtons
      onRemove={handleRemove}
    />
  ));

  it('renders revise button and delete button', () => {
    const { container } = renderIntroduceActionButtons();

    expect(container).toHaveTextContent('수정');
    expect(container).toHaveTextContent('삭제');
  });

  context('When the Cancel button is pressed', () => {
    it("doesn't remove call", () => {
      const { getByText } = renderIntroduceActionButtons();

      fireEvent.click(getByText('삭제'));

      fireEvent.click(getByText('취소'));

      expect(handleRemove).not.toBeCalled();
    });
  });

  context('When the Confirm button is pressed', () => {
    it('call remove event', () => {
      const { getByText } = renderIntroduceActionButtons();

      fireEvent.click(getByText('삭제'));

      fireEvent.click(getByText('확인'));

      expect(handleRemove).toBeCalledTimes(1);
    });
  });
});
