import setMatchMedia from './__mocks__/matchMedia';

import {
  getAuth,
  getGroup,
  equal,
  changeDateToTime,
  authorizedUsersNumber,
  toStringEndDateFormat,
  formatGroup,
  getCommon,
  getInitTheme,
  isDevLevel,
  isNullFields,
} from './utils';

import { loadItem } from '../services/storage';

jest.mock('../services/storage');
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

test('getCommon', () => {
  const state = {
    commonReducer: {
      theme: false,
    },
  };

  const f = getCommon('theme');
  const g = getCommon('age');

  expect(f(state)).toBeFalsy();
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

describe('isNullFields', () => {
  context('with fields data', () => {
    const formData = {
      userEmail: 'test@test.com',
      password: '1111',
    };

    it('Should be return false', () => {
      const result = isNullFields(formData);

      expect(result).toBeFalsy();
    });
  });

  context('without fields data', () => {
    const formData = {
      userEmail: '',
      password: '1111',
    };

    it('Should be return true', () => {
      const result = isNullFields(formData);

      expect(result).toBeTruthy();
    });
  });
});

describe('getInitTheme', () => {
  context('Have theme in localStorage', () => {
    describe('theme is dark', () => {
      beforeEach(() => {
        loadItem.mockImplementationOnce(() => true);
      });
      it('Should be return true', () => {
        const result = getInitTheme();

        expect(result).toBeTruthy();
      });
    });

    describe('theme is light', () => {
      beforeEach(() => {
        loadItem.mockImplementationOnce(() => false);
      });
      it('Should be return false', () => {
        const result = getInitTheme();

        expect(result).toBeFalsy();
      });
    });
  });

  context("Haven't theme in localStorage", () => {
    describe('theme is dark', () => {
      beforeEach(() => {
        setMatchMedia(true);
      });

      it('Should be return true', () => {
        const result = getInitTheme();

        expect(result).toBeTruthy();
      });
    });

    describe('theme is light', () => {
      beforeEach(() => {
        setMatchMedia(false);
      });

      it('Should be return false', () => {
        const result = getInitTheme();

        expect(result).toBeFalsy();
      });
    });
  });
});

describe('isDevLevel', () => {
  context('With production', () => {
    it('Should be return false', () => {
      const result = isDevLevel('production');

      expect(result).toBeFalsy();
    });
  });

  context('Without production', () => {
    it('Should be return true', () => {
      const result = isDevLevel('development');

      expect(result).toBeTruthy();
    });
  });
});

test('changeDateToTime', () => {
  const date = new Date();

  const time = changeDateToTime(date);
  expect(time).toBe(date.getTime());
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

describe('toStringEndDateFormat', () => {
  context('with endDate', () => {
    it('formatting endDate', () => {
      const result = toStringEndDateFormat(new Date('2020/01/01'));

      expect(result).toBe('2020-01-01T00:00');
    });
  });

  context('without endDate', () => {
    it("doesn't formatting endDate", () => {
      const result = toStringEndDateFormat();

      expect(result).toBe();
    });
  });
});

test('formatGroup', () => {
  const nowString = new Date().toString();

  const date = {
    toDate: () => new Date(),
  };

  const reviews = [
    {
      createDate: {
        toDate: () => new Date(),
      },
    },
  ];

  const settings = {
    id: '1',
    data: () => ({
      applyEndDate: date,
      createDate: date,
      reviews,
    }),
  };

  const result = formatGroup(settings);
  expect(result).toEqual({
    id: '1',
    applyEndDate: nowString,
    createDate: nowString,
    reviews: [{
      createDate: nowString,
    }],
  });
});
