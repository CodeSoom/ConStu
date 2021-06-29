import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getCommon } from '../../util/utils';
import { changeTheme } from '../../reducers/commonSlice';

import ThemeToggle from '../../components/base/ThemeToggle';

const ThemeToggleContainer = () => {
  const dispatch = useDispatch();

  const theme = useSelector(getCommon('theme'));

  const onChange = useCallback(() => dispatch(changeTheme()), [dispatch]);

  return (
    <ThemeToggle
      theme={theme}
      onChange={onChange}
    />
  );
};

export default ThemeToggleContainer;
