import { db, auth } from './firebase';

export const getStudyGroups = async () => {
  const response = await db.collection('groups').get();

  const groups = response.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return groups;
};

export const getStudyGroup = async (id) => {
  const response = await db.collection('groups').doc(id).get();

  if (!response.exists) {
    return null;
  }

  return response.data();
};

export const postStudyGroup = async (post) => {
  const { id } = await db.collection('groups').add(post);

  return id;
};

export const postUserRegister = async ({ userEmail, password }) => {
  const response = await auth
    .createUserWithEmailAndPassword(userEmail, password);

  return response;
};

export const postUserLogin = async ({ userEmail, password }) => {
  const response = await auth
    .signInWithEmailAndPassword(userEmail, password);

  return response;
};

export const postUserLogout = async () => {
  await auth.signOut();
};
