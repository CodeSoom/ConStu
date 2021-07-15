import { useDispatch, useSelector } from 'react-redux';

import { renderHook, act } from '@testing-library/react-hooks';

import useNotFound from './useNotFound';

describe('useNotFound', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      commonReducer: {
        errorType: given.errorType,
      },
    }));
  });

  const renderNotFound = () => renderHook(() => useNotFound());

  describe('isNotFound', () => {
    context('Have NOT_FOUND error type', () => {
      it('should return true', () => {
        given('errorType', () => ('NOT_FOUND'));

        const { result } = renderNotFound();

        expect(result.current.isNotFound).toBeTruthy();
      });
    });

    context("Haven't NOT_FOUND error type", () => {
      it('should return false', () => {
        given('errorType', () => (''));

        const { result } = renderNotFound();

        expect(result.current.isNotFound).toBeFalsy();
      });
    });
  });

  describe('calls reset', () => {
    it('should be listens dispatch action', () => {
      given('errorType', () => (''));

      const { result } = renderNotFound();

      act(() => {
        result.current.reset();
      });

      expect(dispatch).toBeCalledWith({
        type: 'common/resetError',
      });
    });
  });

  describe('calls showNotFound', () => {
    it('should be listens dispatch action', () => {
      given('errorType', () => (''));

      const { result } = renderNotFound();

      act(() => {
        result.current.showNotFound();
      });

      expect(dispatch).toBeCalledWith({
        type: 'common/setNotFound',
      });
    });
  });
});
