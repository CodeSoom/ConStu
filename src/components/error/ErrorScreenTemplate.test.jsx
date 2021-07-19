import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ErrorScreenTemplate from './ErrorScreenTemplate';

describe('ErrorScreenTemplate', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const renderErrorScreenTemplate = ({ message, buttonText }) => render((
    <ErrorScreenTemplate
      message={message}
      buttonText={buttonText}
      onClick={handleClick}
    />
  ));

  it('should be renders error template contents', () => {
    const { container } = renderErrorScreenTemplate({
      message: '아무것도 없어요!',
      buttonText: '홈으로',
    });

    expect(container).toHaveTextContent('아무것도 없어요!');
    expect(container).toHaveTextContent('홈으로');
  });

  it('handle Click event', () => {
    const { getByText } = renderErrorScreenTemplate({
      message: '아무것도 없어요!',
      buttonText: '홈으로',
    });

    fireEvent.click(getByText('홈으로'));

    expect(handleClick).toBeCalled();
  });
});
