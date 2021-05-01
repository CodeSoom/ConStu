const firebase = jest.genMockFromModule('firebase/app');

const mockOrderBy = {
  orderBy: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockReturnValue({
      docs: [],
    }),
  })),
};

firebase.firestore = jest.fn().mockImplementation(() => ({
  collection: jest.fn().mockImplementation(() => ({
    doc: jest.fn().mockImplementation(() => ({
      update: jest.fn(),
      delete: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    })),
    add: jest.fn().mockReturnValue({ id: 'id' }),
    where: jest.fn().mockReturnValue(mockOrderBy),
    ...mockOrderBy,
  })),
}));

firebase.auth = jest.fn().mockReturnValue({});

export default firebase;
