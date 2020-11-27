import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import WriteForm from './WriteForm';

import WRITE_FORM from '../../../fixtures/write-form';

describe('WriteForm', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderWriteForm = (fields) => render((
    <WriteForm
      fields={fields}
      onChange={handleChange}
    />
  ));

  it('renders input write form text', () => {
    const { getByLabelText, getByPlaceholderText } = renderWriteForm(WRITE_FORM);

    const {
      title, applyEndDate, personnel,
    } = WRITE_FORM;

    expect(getByPlaceholderText('제목을 입력하세요')).toHaveValue(title);
    expect(getByLabelText('모집 마감 날짜')).toHaveValue(applyEndDate);
    expect(getByLabelText('참여 인원 수')).toHaveValue(personnel);
  });

  describe('listens change event', () => {
    it('write fields value change', () => {
      const { getByPlaceholderText } = renderWriteForm(WRITE_FORM);

      const { title } = WRITE_FORM;

      const inputTitle = getByPlaceholderText('제목을 입력하세요');
      expect(inputTitle).toHaveValue(title);

      fireEvent.change(inputTitle, {
        target: {
          value: '안녕하세요!',
          name: 'title',
        },
      });

      expect(handleChange).toBeCalled();
    });
  });
});
