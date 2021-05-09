import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ThemeToggleButton from './ThemeToggleButton';

jest.mock('../../services/storage');
describe('ThemeToggleButton', () => {
  const handleChange = jest.fn();

  const renderThemeToggleButton = (theme) => render((
    <ThemeToggleButton
      theme={theme}
      onChange={handleChange}
    />
  ));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('When theme is Light', () => {
    it('renders theme toggle button', () => {
      const { getByTestId } = renderThemeToggleButton(false);

      expect(getByTestId('theme-toggle')).not.toBeNull();
      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'light');
    });

    describe('Click toggle button', () => {
      it('should be calls change event', () => {
        const { getByTestId } = renderThemeToggleButton(false);

        const button = getByTestId('theme-toggle');

        expect(button).toHaveAttribute('title', 'light');

        fireEvent.click(button);

        expect(handleChange).toBeCalledTimes(1);
      });
    });
  });

  context('When theme is Dark', () => {
    it('renders theme toggle button', () => {
      const { getByTestId } = renderThemeToggleButton(true);

      expect(getByTestId('theme-toggle')).not.toBeNull();
      expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'dark');
    });

    describe('Click toggle button', () => {
      it('should be calls change event', () => {
        const { getByTestId } = renderThemeToggleButton(true);

        const button = getByTestId('theme-toggle');

        expect(button).toHaveAttribute('title', 'dark');

        fireEvent.click(button);

        expect(handleChange).toBeCalledTimes(1);
      });
    });
  });
});
