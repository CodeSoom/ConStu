import { auth, actionCodeSettings } from './firebase';

describe('actionCodeSettings', () => {
  beforeEach(() => {
    auth.currentUser = {
      email: 'test@test.com',
    };
  });

  context('When Development Level', () => {
    it('should return dev level action code settings config', () => {
      const result = actionCodeSettings(true);

      expect(result).toEqual({
        url: 'http://localhost:8080/myinfo/setting/?email=test@test.com',
      });
    });
  });

  context('When Production Level', () => {
    it('should return Pro level action code settings config', () => {
      const result = actionCodeSettings(false);

      expect(result).toEqual({
        url: 'https://sweet-1cfff.firebaseapp.com/myinfo/setting/?email=test@test.com',
      });
    });
  });
});
