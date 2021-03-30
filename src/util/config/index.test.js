import config from '.';

import devConfig from './dev';
import prodConfig from './prod';

describe('config', () => {
  context('When ENV is Production', () => {
    it('should be prodConfig', () => {
      expect(config('production')).toBe(prodConfig);
    });
  });

  context('When ENV is Development', () => {
    it('should be devConfig', () => {
      expect(config('development')).toBe(devConfig);
    });
  });
});
