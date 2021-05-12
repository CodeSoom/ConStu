import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import WriteEditorContainer from './WriteEditorContainer';
import MockTheme from '../../components/common/test/MockTheme';

describe('WriteEditorContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      groupReducer: {
        writeField: {
          contents: given.contents,
        },
      },
    }));
  });

  const renderWriteEditorContainer = () => render((
    <MockTheme>
      <WriteEditorContainer />
    </MockTheme>
  ));

  context('with contents', () => {
    given('contents', () => ('<p>test</p>'));

    describe('render Write Editor Container contents text', () => {
      it('renders initial contents', () => {
        const { container } = renderWriteEditorContainer();

        expect(container).toHaveTextContent(('test'));
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

  context('without contents', () => {
    given('contents', () => (''));

    describe('render Write Editor Container contents text', () => {
      it('renders editor placeholder text', () => {
        const { container } = renderWriteEditorContainer();

        expect(container).toHaveTextContent(('내용을 작성해주세요.'));
      });
    });
  });
});
