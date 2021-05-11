import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TagsFormContainer from './TagsFormContainer';
import MockTheme from '../../components/common/test/MockTheme';

describe('TagsFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      groupReducer: {
        writeField: {
          tags: [],
        },
      },
    }));
  });

  const renderTagsFormContainer = () => render((
    <MockTheme>
      <TagsFormContainer />
    </MockTheme>
  ));

  describe('render Tag Form Container contents text', () => {
    it('renders tag form text', () => {
      const { getByPlaceholderText } = renderTagsFormContainer();

      expect(getByPlaceholderText('태그를 입력하세요')).not.toBeNull();
    });
  });

  describe('calls dispatch tags change action', () => {
    const tags = ['JavaScript', 'React'];
    it('change tags', () => {
      const { getByPlaceholderText } = renderTagsFormContainer();

      const input = getByPlaceholderText('태그를 입력하세요');

      tags.forEach((tag) => {
        fireEvent.change(input, { target: { value: tag } });

        fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

        expect(input).toHaveValue('');
      });
      expect(dispatch).toBeCalledWith({
        type: 'group/changeWriteField',
        payload: { name: 'tags', value: tags },
      });
    });
  });
});
