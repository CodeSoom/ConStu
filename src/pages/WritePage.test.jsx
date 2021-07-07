import '../util/__mocks__/matchMedia';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import WritePage from './WritePage';
import MockTheme from '../components/common/test/MockTheme';

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
      commonReducer: {
        theme: false,
      },
    }));
  });

  const renderWritePage = () => render((
    <MockTheme>
      <MemoryRouter>
        <WritePage />
      </MemoryRouter>
    </MockTheme>
  ));

  describe('render Write Page contents text', () => {
    it('renders theme toggle button', () => {
      const { getByTestId } = renderWritePage();

      expect(getByTestId('theme-toggle')).not.toBeNull();
    });

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
