import { getAuth, getGroup, equal } from './utils';

test('getAuth', () => {
  const state = {
    authReducer: {
      name: '홍길동',
    },
  };

  const f = getAuth('name');
  const g = getAuth('age');

  expect(f(state)).toBe('홍길동');
  expect(g(state)).toBeUndefined();
});

test('getGroup', () => {
  const state = {
    groupReducer: {
      name: '홍길동',
    },
  };

  const f = getGroup('name');
  const g = getGroup('age');

  expect(f(state)).toBe('홍길동');
  expect(g(state)).toBeUndefined();
});

test('equal', () => {
  const state = {
    name: '홍길동',
  };

  const f = equal('name', '홍길동');
  const g = equal('name', '임꺽정');

  expect(f(state)).toBeTruthy();
  expect(g(state)).toBeFalsy();
});
