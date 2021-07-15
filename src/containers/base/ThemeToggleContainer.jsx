import React from 'react';

import useTheme from '../../hooks/useTheme';

import ThemeToggle from '../../components/base/ThemeToggle';

const ThemeToggleContainer = () => {
  const { theme, changeMode } = useTheme();

  return (
    <ThemeToggle
      theme={theme}
      onChange={changeMode}
    />
  );
};

export default ThemeToggleContainer;
