import { saveItem, loadItem, removeItem } from './storage';

describe('storage', () => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');

  beforeEach(() => {
    const mockStorage = {};

    window.localStorage = {
      setItem: (key, val) => Object.assign(mockStorage, { [key]: val }),
      getItem: (key) => mockStorage[key],
    };

    window.localStorage.__proto__.removeItem = jest.fn();
  });

  describe('saveItem', () => {
    const value = {
      value: 'value',
    };
    it('calls localStorage setItem', () => {
      saveItem('key', value);

      expect(localStorage.setItem).toBeCalledWith('key', JSON.stringify(value));
    });
  });

  describe('loadItem', () => {
    it('calls localStorage getItem', () => {
      loadItem('key');

      expect(localStorage.getItem).toBeCalledWith('key');
    });
  });

  describe('removeItem', () => {
    it('calls localStorage removeItem', () => {
      removeItem('key');

      expect(localStorage.removeItem).toBeCalled();
    });
  });
});
