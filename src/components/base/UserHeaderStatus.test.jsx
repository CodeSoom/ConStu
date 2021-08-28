import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import UserHeaderStatus from './UserHeaderStatus';
import InjectMockProviders from '../common/test/InjectMockProviders';

describe('UserHeaderStatus', () => {
  const handleClick = jest.fn();

  const renderUserHeaderStatus = (width) => render((
    <InjectMockProviders width={width}>
      <UserHeaderStatus
        user={given.user}
        onClick={handleClick}
      />
    </InjectMockProviders>
  ));

  context('Is mobile Screen', () => {
    given('user', () => 'test');
    it('Renders user icon', () => {
      const { getByTestId } = renderUserHeaderStatus(400);

      expect(getByTestId('user-icon')).not.toBeNull();
    });

    it('Click on the user icon renders a drop-down menu', () => {
      const { getByTestId, container } = renderUserHeaderStatus(400);

      fireEvent.click(getByTestId('user-icon'));

      expect(container).toHaveTextContent('로그아웃');
    });
  });

  context('Is desktop Screen', () => {
    it('Renders logout button and user id', () => {
      given('user', () => 'test');

      const { container } = renderUserHeaderStatus(700);

      expect(container).toHaveTextContent('로그아웃');
      expect(container).toHaveTextContent('test');
      expect(container).toHaveTextContent('내 정보');
    });

    it('Click logout button calls handleClick', () => {
      given('user', () => null);

      const { getByText } = renderUserHeaderStatus(700);

      fireEvent.click(getByText('로그아웃'));

      expect(handleClick).toBeCalledTimes(1);
    });
  });
});
