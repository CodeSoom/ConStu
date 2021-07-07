import '../../util/__mocks__/matchMedia';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import WriteFormContainer from './WriteFormContainer';
import MockTheme from '../../components/common/test/MockTheme';

describe('WriteFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      groupReducer: {
        writeField: {
          title: '',
          contents: '',
          moderatorId: '',
          applyEndDate: '',
          participants: [],
          personnel: 0,
        },
      },
    }));
  });

  const renderWriteFormContainer = () => render((
    <MockTheme>
      <WriteFormContainer />
    </MockTheme>
  ));

  describe('render Write Form Container contents text', () => {
    it('renders write input text', () => {
      const { getByPlaceholderText, getByLabelText } = renderWriteFormContainer();

      expect(getByPlaceholderText('제목을 입력하세요')).not.toBeNull();
      expect(getByLabelText('모집 마감 날짜')).not.toBeNull();
      expect(getByLabelText('참여 인원 수')).not.toBeNull();
    });
  });

  describe('dispatch actions call', () => {
    const { value, name } = {
      name: 'title',
      value: '안녕하세요!',
    };
    it('listens actions change event', () => {
      const { getByPlaceholderText } = renderWriteFormContainer();

      const inputTitle = getByPlaceholderText('제목을 입력하세요');

      expect(inputTitle).toHaveValue('');

      fireEvent.change(inputTitle, {
        target: { value, name },
      });

      expect(dispatch).toBeCalledWith({
        payload: {
          name,
          value,
        },
        type: 'group/changeWriteField',
      });
    });
  });
});
