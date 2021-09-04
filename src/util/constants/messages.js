export const ERROR_MESSAGE = {
  NO_INPUT: '입력이 안된 사항이 있습니다.',
  NOT_MATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
  NO_TAG: '태그를 입력하세요.',
  FAST_APPLY_DEADLINE: '접수 마감날짜가 현재 시간보다 빠릅니다.',
  FAILURE_REGISTER: '회원가입에 실패하였습니다.',
  FAILURE_LOGIN: '로그인에 실패하였습니다.',
  NO_LOGGED_IN: '로그인 후 이용하세요.',
  NO_CONTENTS: '내용을 입력해주세요.',
  NO_TITLE: '제목을 입력해주세요.',
  NO_APPLY_DATE: '모집 마감 일자를 입력해주세요.',
  ERROR_PERSONNEL: '참여 인원 수를 입력하지 않았거나, 잘못된 값을 입력하였습니다.',
  FAILURE_OPEN_STUDY: '스터디 개설에 실패하였습니다.',
  FAILURE_EDIT_STUDY: '수정에 실패하였습니다.',
  FAILURE_SEND_EMAIL: '메일 전송에 실패하였습니다.',
  UNKNOWN: '알 수 없는 오류가 발생했습니다.',
};

export const FIREBASE_AUTH_ERROR_MESSAGE = {
  'auth/email-already-in-use': '이미 가입된 사용자입니다.',
  'auth/weak-password': '6자리 이상의 비밀번호를 입력하세요.',
  'auth/too-many-requests': '잠시 후 다시 시도해 주세요.',
  'auth/wrong-password': '비밀번호가 일치하지 않습니다.',
  'auth/user-not-found': '가입된 사용자가 아닙니다.',
  'auth/invalid-email': '이메일 형식으로 입력하세요.',
};

export const FIREBASE_GROUP_ERROR_MESSAGE = {
  'permission-denied': '권한이 거부되었습니다.',
};

export const SUCCESS_AUTH_MESSAGE = {
  CONFIRM_EMAIL: '이메일을 확인해주세요!',
  MEMBERSHIP_WITHDRAWAL: '탈퇴되었습니다.',
  UPDATE_PROFILE: '정상적으로 저장되었습니다',
};
