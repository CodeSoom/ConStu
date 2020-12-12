import {
  getAuth,
  getGroup,
  equal,
  changeDateToTime,
  applyDateToString,
  createDateToString,
  authorizedUsersNumber,
} from './utils';

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

test('changeDateToTime', () => {
  const date = new Date();

  const time = changeDateToTime(date);
  expect(time).toBe(date.getTime());
});

test('applyDateToString', () => {
  const date = new Date('2020/12/06');
  const response = {
    data: jest.fn().mockReturnValue({
      applyEndDate: {
        toDate: jest.fn().mockReturnValue(date),
      },
    }),
  };

  const time = applyDateToString(response);
  expect(time).toBe(date.toString());
});

test('createDateToString', () => {
  const date = new Date('2020/12/06');
  const response = {
    data: jest.fn().mockReturnValue({
      createDate: {
        toDate: jest.fn().mockReturnValue(date),
      },
    }),
  };

  const time = createDateToString(response);
  expect(time).toBe(date.toString());
});

test('authorizedUsersNumber', () => {
  const participants = [
    { id: 'test1', confirm: false },
    { id: 'test2', confirm: true },
    { id: 'test3' },
  ];

  const length = authorizedUsersNumber(participants);
  expect(length).toBe(2);
});
