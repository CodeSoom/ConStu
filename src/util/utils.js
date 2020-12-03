export const getAuth = (key) => (obj) => obj.authReducer[key];

export const getGroup = (key) => (obj) => obj.groupReducer[key];

export function equal(key, value) {
  return (obj) => obj[key] === value;
}

export const isCheckedTimeStatus = ({
  time, applyEndTime, participants, personnel,
}) => (!!((time - applyEndTime >= 0 || participants.length === parseInt(personnel, 10))));

const checkTrim = (value) => value.trim();

export const isCheckValidate = (values) => values.map(checkTrim).includes('');
