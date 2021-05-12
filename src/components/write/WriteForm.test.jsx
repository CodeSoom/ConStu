import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import WRITE_FORM from '../../../fixtures/write-form';

import WriteForm from './WriteForm';
import MockTheme from '../common/test/MockTheme';

describe('WriteForm', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderWriteForm = (fields) => render((
    <MockTheme>
      <WriteForm
        fields={fields}
        onChange={handleChange}
      />
    </MockTheme>
  ));

  it('renders input write form text', () => {
    const { getByLabelText, getByPlaceholderText } = renderWriteForm({
      ...WRITE_FORM,
      applyEndDate: new Date('2021-04-01 09:00'),
    });

    const { title, personnel } = WRITE_FORM;

    expect(getByPlaceholderText('제목을 입력하세요')).toHaveValue(title);
    expect(getByLabelText('모집 마감 날짜')).toHaveValue('2021-04-01 09:00 AM');
    expect(getByLabelText('참여 인원 수')).toHaveValue(parseInt(personnel, 10));
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

  it('date-picker change event', () => {
    const { container, getByLabelText } = renderWriteForm({
      ...WRITE_FORM,
      applyEndDate: '',
    });

    fireEvent.click(getByLabelText('모집 마감 날짜'));

    expect(container).toHaveTextContent('Time');
  });
});
