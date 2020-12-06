import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import WritePage from './WritePage';

describe('WritePage', () => {
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
      authReducer: {
        user: 'user1',
      },
    }));
  });

  const renderWritePage = () => render((
    <WritePage />
  ));

  describe('render Write Page contents text', () => {
    it('renders Write Editor placeholder text', () => {
      const { container } = renderWritePage();

      expect(container).toHaveTextContent('내용을 작성해주세요.');
    });

    it('renders write form tag', () => {
      const { getByPlaceholderText } = renderWritePage();

      expect(getByPlaceholderText('제목을 입력하세요')).not.toBeNull();
    });

    it('renders tag form text', () => {
      const { getByPlaceholderText } = renderWritePage();

      expect(getByPlaceholderText('태그를 입력하세요')).not.toBeNull();
    });

    it('renders buttons', () => {
      const { getByText } = renderWritePage();

      expect(getByText('등록하기')).not.toBeNull();
      expect(getByText('취소')).not.toBeNull();
    });
  });
});
