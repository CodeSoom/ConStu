import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import DropDown from './DropDown';
import MockTheme from '../common/test/MockTheme';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return {
      push: mockPush,
    };
  },
}));
describe('DropDown', () => {
  const handleClick = jest.fn();

  const renderDropDown = (visible) => render((
    <MockTheme>
      <DropDown
        user="test"
        visible={visible}
        onLogout={handleClick}
      />
    </MockTheme>
  ));

  context('Is Visible', () => {
    it('Renders DropDown content', () => {
      const { container } = renderDropDown(true);

      expect(container).toHaveTextContent('test');
      expect(container).toHaveTextContent('로그아웃');
      expect(container).toHaveTextContent('내 정보');
    });

    it('Click logout button calls handleClick', () => {
      const { getByText } = renderDropDown(true);

      fireEvent.click(getByText('로그아웃'));

      expect(handleClick).toBeCalledTimes(1);
    });

    it('Click myInfo button calls history push', () => {
      const { getByText } = renderDropDown(true);

      fireEvent.click(getByText('내 정보'));

      expect(mockPush).toBeCalledWith('/myinfo');
    });
  });

  context("Isn't visible", () => {
    it('Renders logout button and user id', () => {
      const { container } = renderDropDown(false);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
