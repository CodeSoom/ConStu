import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ThemeToggleContainer from './ThemeToggleContainer';

describe('ThemeToggleContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      commonReducer: {
        theme: given.theme,
      },
    }));
  });

  const renderThemeToggleContainer = () => render((
    <ThemeToggleContainer />
  ));

  context('When theme is Light', () => {
    given('theme', () => (false));

    it('renders theme toggle button', () => {
      const { getByTestId } = renderThemeToggleContainer();

      expect(getByTestId('theme-toggle')).not.toBeNull();
      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'light');
    });

    describe('When click theme toggle button', () => {
      it('should be listens dispatch changeTheme event', () => {
        const { getByTestId } = renderThemeToggleContainer();

        const button = getByTestId('theme-toggle');

        expect(button).toHaveAttribute('title', 'light');

        fireEvent.click(button);

        expect(dispatch).toBeCalledWith({
          type: 'common/changeTheme',
        });
      });
    });
  });

  context('When theme is Dark', () => {
    given('theme', () => (true));
    it('renders theme toggle button', () => {
      const { getByTestId } = renderThemeToggleContainer();

      expect(getByTestId('theme-toggle')).not.toBeNull();
      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'dark');
    });

    describe('When click theme toggle button', () => {
      it('should be listens dispatch changeTheme event', () => {
        const { getByTestId } = renderThemeToggleContainer();

        const button = getByTestId('theme-toggle');

        expect(button).toHaveAttribute('title', 'dark');

        fireEvent.click(button);

        expect(dispatch).toBeCalledWith({
          type: 'common/changeTheme',
        });
      });
    });
  });
});
