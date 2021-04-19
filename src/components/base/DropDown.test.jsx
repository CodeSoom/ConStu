import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import DropDown from './DropDown';

describe('DropDown', () => {
  const handleClick = jest.fn();

  const renderDropDown = (visible) => render((
    <DropDown
      user="test"
      visible={visible}
      onLogout={handleClick}
    />
  ));

  context('Is Visible', () => {
    it('Renders DropDown content', () => {
      const { container } = renderDropDown(true);

      expect(container).toHaveTextContent('test');
      expect(container).toHaveTextContent('로그아웃');
    });

    it('Click logout button calls handleClick', () => {
      const { getByText } = renderDropDown(true);

      fireEvent.click(getByText('로그아웃'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });

  context("Isn't visible", () => {
    it('Renders logout button and user id', () => {
      const { container } = renderDropDown(false);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
