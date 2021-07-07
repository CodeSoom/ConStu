import reducer, {
  changeTheme, setNotFound, resetError,
} from './commonSlice';

jest.mock('../util/utils');
describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      theme: undefined,
      errorType: null,
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('changeTheme', () => {
    it('change theme state', () => {
      const state = reducer({ theme: false }, changeTheme());

      expect(state.theme).toBe(true);
    });
  });

  describe('setNotFound', () => {
    it('should be set "NOT_FOUND" error type', () => {
      const state = reducer({ errorType: null }, setNotFound());

      expect(state.errorType).toBe('NOT_FOUND');
    });
  });

  describe('resetError', () => {
    it('should be reset error type', () => {
      const state = reducer({ errorType: 'NOT_FOUND' }, resetError());

      expect(state.errorType).toBeNull();
    });
  });
});
