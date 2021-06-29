import '../util/__mocks__/matchMedia';

import reducer, {
  changeTheme,
} from './commonSlice';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      theme: false,
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
});
