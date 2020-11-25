export function get(key) {
  return (obj) => obj[key];
}

export function equal(key, value) {
  return (obj) => obj[key] === value;
}

export const isCheckedTimeStatus = ({
  time, applyEndTime, participants, personnel,
}) => (!!((time - applyEndTime >= 0 || participants.length === parseInt(personnel, 10))));
