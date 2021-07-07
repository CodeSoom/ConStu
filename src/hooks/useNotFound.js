import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getCommon } from '../util/utils';
import { setNotFound, resetError } from '../reducers/commonSlice';

function useNotFound() {
  const dispatch = useDispatch();

  const errorType = useSelector(getCommon('errorType'));

  const showNotFound = useCallback(() => dispatch(setNotFound()), [dispatch]);

  const reset = useCallback(() => dispatch(resetError()), [dispatch]);

  return {
    reset,
    showNotFound,
    isNotFound: errorType === 'NOT_FOUND',
  };
}

export default useNotFound;
