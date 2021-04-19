import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Context as ResponsiveContext } from 'react-responsive';

import UserHeaderStatus from './UserHeaderStatus';

describe('UserHeaderStatus', () => {
  const handleClick = jest.fn();

  const renderUserHeaderStatus = (width) => render((
    <ResponsiveContext.Provider value={{ width }}>
      <UserHeaderStatus
        user="test"
        onClick={handleClick}
      />
    </ResponsiveContext.Provider>
  ));

  context('Is mobile Screen', () => {
    it('Renders user icon', () => {
      const { getByTestId } = renderUserHeaderStatus(400);

      expect(getByTestId('user-icon')).not.toBeNull();
    });
  });

  context('Is desktop Screen', () => {
    it('Renders logout button and user id', () => {
      const { container } = renderUserHeaderStatus(700);

      expect(container).toHaveTextContent('로그아웃');
      expect(container).toHaveTextContent('test');
    });

    it('Click logout button calls handleClick', () => {
      const { getByText } = renderUserHeaderStatus(700);

      fireEvent.click(getByText('로그아웃'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
