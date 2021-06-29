import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ThemeToggle from './ThemeToggle';

jest.mock('../../services/storage');
describe('ThemeToggle', () => {
  const handleChange = jest.fn();

  const renderThemeToggle = (theme) => render((
    <ThemeToggle
      theme={theme}
      onChange={handleChange}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('When theme is Light', () => {
    it('renders theme toggle button', () => {
      const { getByTestId } = renderThemeToggle(false);

      expect(getByTestId('theme-toggle')).not.toBeNull();
      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'light');
    });

    describe('Click toggle button', () => {
      it('should be calls change event', () => {
        const { getByTestId } = renderThemeToggle(false);

        const button = getByTestId('theme-toggle');

        expect(button).toHaveAttribute('title', 'light');

        fireEvent.click(button);

        expect(handleChange).toBeCalledTimes(1);
      });
    });
  });

  context('When theme is Dark', () => {
    it('renders theme toggle button', () => {
      const { getByTestId } = renderThemeToggle(true);

      expect(getByTestId('theme-toggle')).not.toBeNull();
      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'dark');
    });

    describe('Click toggle button', () => {
      it('should be calls change event', () => {
        const { getByTestId } = renderThemeToggle(true);

        const button = getByTestId('theme-toggle');

        expect(button).toHaveAttribute('title', 'dark');

        fireEvent.click(button);

        expect(handleChange).toBeCalledTimes(1);
      });
    });
  });
});
