import { db, auth } from './firebase';

const branchGetGroups = (tag) => {
  if (tag) {
    return db.collection('groups').where('tags', 'array-contains', tag).get();
  }

  return db.collection('groups').get();
};

export const getStudyGroups = async (tag) => {
  const response = await branchGetGroups(tag);

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

export const updateParticipants = async (group) => {
  const { id, participants } = group;

  const groups = db.collection('groups').doc(id);

  await groups.update({ participants });
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
