import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import WriteEditorContainer from './WriteEditorContainer';

describe('WriteEditorContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      writeField: {
        contents: '',
      },
    }));
  });

  const renderWriteEditorContainer = () => render((
    <WriteEditorContainer />
  ));

  describe('render Write Editor Container contents text', () => {
    it('renders editor placeholder text', () => {
      const { container } = renderWriteEditorContainer();

      expect(container).toHaveTextContent(('내용을 작성해주세요.'));
    });
  });

  describe('dispatch actions call', () => {
    it('listens actions changeWriteField event', () => {
      const { getByLabelText, container } = renderWriteEditorContainer();

      const contents = getByLabelText('contents').querySelector('div');

      fireEvent.keyPress(contents, {
        target: { innerHTML: '안녕하세요!' },
      });

      expect(container).toHaveTextContent('안녕하세요!');
    });
  });
});
