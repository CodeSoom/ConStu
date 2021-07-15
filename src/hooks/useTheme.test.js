import { useDispatch, useSelector } from 'react-redux';

import { renderHook, act } from '@testing-library/react-hooks';

import useTheme from './useTheme';

import { LIGHT } from '../util/constants/theme';

describe('useTheme', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      commonReducer: {
        theme: LIGHT,
      },
    }));
  });

  const renderUseTheme = () => renderHook(() => useTheme());

  describe('theme', () => {
    it('should return LIGHT(false)', () => {
      const { result } = renderUseTheme();

      expect(result.current.theme).toBe(LIGHT);
    });
  });

  describe('Calls changeMode', () => {
    it('should be listens dispatch action', () => {
      const { result } = renderUseTheme();

      act(() => {
        result.current.changeMode();
      });

      expect(dispatch).toBeCalledWith({
        type: 'common/changeTheme',
      });
    });
  });
});
