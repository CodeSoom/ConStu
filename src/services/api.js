import {
  db, auth, fireStore, actionCodeSettings, authProvider,
} from './firebase';

import { isDevLevel } from '../util/utils';

const timeStamp = (dateTime) => fireStore.Timestamp.fromDate(new Date(dateTime));

const branchGetGroups = (tag) => {
  if (tag) {
    return db
      .collection('groups')
      .where('tags', 'array-contains', tag)
      .orderBy('applyEndDate', 'asc')
      .get();
  }

  return db
    .collection('groups')
    .orderBy('applyEndDate', 'asc')
    .get();
};

export const getStudyGroups = async (tag) => {
  const response = await branchGetGroups(tag);

  return response.docs;
};

export const getStudyGroup = async (id) => {
  const response = await db
    .collection('groups')
    .doc(id)
    .get();

  if (!response.exists) {
    return null;
  }

  return response;
};

export const postStudyGroup = async (group) => {
  const { applyEndDate } = group;

  const { id } = await db.collection('groups').add({
    ...group,
    applyEndDate: timeStamp(applyEndDate),
    createDate: fireStore.FieldValue.serverTimestamp(),
  });

  return id;
};

export const editPostStudyGroup = async ({
  title, applyEndDate, contents, tags, personnel, id,
}) => {
  const group = db.collection('groups').doc(id);

  await group.update({
    title,
    contents,
    applyEndDate: timeStamp(applyEndDate),
    personnel,
    tags,
  });
};

export const postUpdateStudyReview = async ({ groupId, review }) => {
  const group = db.collection('groups').doc(groupId);

  await group.set({
    reviews: fireStore.FieldValue.arrayUnion({
      ...review,
      createDate: fireStore.Timestamp.now(),
    }),
  }, { merge: true });
};

export const updatePostParticipant = async ({ id, user }) => {
  const group = db.collection('groups').doc(id);

  await group.update({
    participants: fireStore.FieldValue.arrayUnion(user),
  });
};

export const deletePostReview = async ({ id, reviews }) => {
  const group = db.collection('groups').doc(id);

  await group.update({
    reviews: reviews.map((review) => ({
      ...review,
      createDate: timeStamp(review.createDate),
    })),
  });
};

export const deletePostParticipant = async ({ id, participants }) => {
  const group = db.collection('groups').doc(id);

  await group.update({
    participants,
  });
};

export const deletePostGroup = async (id) => {
  const group = db.collection('groups').doc(id);

  await group.delete();
};

export const updateConfirmPostParticipant = async ({ id, participants }) => {
  const group = db.collection('groups').doc(id);

  await group.update({
    participants,
  });
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

export const sendEmailVerification = async () => {
  await auth
    .currentUser
    .sendEmailVerification(actionCodeSettings(isDevLevel(process.env.NODE_ENV)));
};

export const sendPasswordResetEmail = async (email) => {
  await auth.sendPasswordResetEmail(
    email,
    actionCodeSettings(isDevLevel(process.env.NODE_ENV)),
  );
};

export const deleteUser = async () => {
  await auth.currentUser.delete();
};

export const postReauthenticateWithCredential = async (password) => {
  const user = auth.currentUser;

  const credential = authProvider.EmailAuthProvider.credential(
    user.email,
    password,
  );

  await user.reauthenticateWithCredential(credential);
};

export const updateUserProfile = async ({ displayName }) => {
  const user = auth.currentUser;

  // TODO - photoURL 추가
  await user.updateProfile({
    displayName,
  });
};
