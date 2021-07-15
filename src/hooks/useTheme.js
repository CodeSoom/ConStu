import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getCommon } from '../util/utils';
import { changeTheme } from '../reducers/commonSlice';

function useTheme() {
  const dispatch = useDispatch();

  const theme = useSelector(getCommon('theme'));

  const changeMode = useCallback(() => dispatch(changeTheme()), [dispatch]);

  return {
    theme,
    changeMode,
  };
}

export default useTheme;
