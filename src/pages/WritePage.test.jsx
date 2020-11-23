import React from 'react';

import { render } from '@testing-library/react';

import WritePage from './WritePage';

describe('WritePage', () => {
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
      expect(getByPlaceholderText('태그를 입력하세요')).not.toBeNull();
      expect(getByText('저장')).not.toBeNull();
    });
  });
});
