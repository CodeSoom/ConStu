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
      writeField: {
        tags: [],
      },
    }));
  });

  const renderWritePage = () => render((
    <WritePage />
  ));

  describe('render Write Page contents text', () => {
    it('renders Write Page Title', () => {
      const { container } = renderWritePage();

      expect(container).toHaveTextContent('스터디 그룹 개설하기');
    });

    it('renders write form tag', () => {
      const { getByPlaceholderText, getByText } = renderWritePage();

      expect(getByPlaceholderText('제목을 입력하세요')).not.toBeNull();
      expect(getByPlaceholderText('내용')).not.toBeNull();
      expect(getByText('저장')).not.toBeNull();
    });

    it('renders tag form text', () => {
      const { getByPlaceholderText, container } = renderWritePage();

      expect(getByPlaceholderText('태그를 입력하세요')).not.toBeNull();
      expect(container).toHaveTextContent('태그');
    });
  });
});
