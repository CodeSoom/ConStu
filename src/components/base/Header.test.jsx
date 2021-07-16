import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Header from './Header';
import InjectMockProviders from '../common/test/InjectMockProviders';

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleClick = jest.fn();

  const renderHeader = ({ user, width = 700 }) => render((
    <InjectMockProviders width={width}>
      <Header
        user={user}
        onLogout={handleClick}
      />
    </InjectMockProviders>
  ));

  context('with user', () => {
    const user = 'seungmin@naver.com';

    context('When desktop screen', () => {
      it('renders Header text', () => {
        const { container } = renderHeader({ user });

        expect(container).toHaveTextContent('로그아웃');
        expect(container).toHaveTextContent(user);
      });

      it('Click logout button listens call', () => {
        const { getByText } = renderHeader({ user });

        fireEvent.click(getByText('로그아웃'));

        expect(handleClick).toBeCalledTimes(1);
      });
    });

    context('When mobile screen', () => {
      it('The dropdown disappears when clicking outside after clicking the user-icon', () => {
        const { getByText, getByTestId, container } = renderHeader({ user, width: 400 });

        fireEvent.click(getByTestId('user-icon'));

        expect(container).toHaveTextContent('seungmin@naver.com');

        fireEvent.mouseDown(getByText('ConStu'));

        expect(container).not.toHaveTextContent('seungmin@naver.com');
      });

      it('The dropdown does not disappear when mosedown the dropdown after clicking the user-icon.', () => {
        const { getByText, getByTestId, container } = renderHeader({ user, width: 400 });

        fireEvent.click(getByTestId('user-icon'));

        expect(container).toHaveTextContent('seungmin@naver.com');

        fireEvent.mouseDown(getByText('seungmin@naver.com'));

        expect(container).toHaveTextContent('seungmin@naver.com');
      });
    });
  });

  context('without user', () => {
    it('renders Header text', () => {
      const { container } = renderHeader({ user: null });

      expect(container).toHaveTextContent('로그인');
      expect(container).toHaveTextContent('회원가입');
    });
  });
});
