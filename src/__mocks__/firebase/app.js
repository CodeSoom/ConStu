const firebase = jest.genMockFromModule('firebase/app');

firebase.firestore = jest.fn().mockImplementation(() => ({
  collection: jest.fn().mockImplementation(() => ({
    doc: jest.fn().mockImplementation(() => ({
      update: jest.fn(),
      delete: jest.fn(),
    })),
  })),
}));

firebase.auth = jest.fn().mockImplementation(() => ({}));

export default firebase;
