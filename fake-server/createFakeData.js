const range = (length) => Array.from({ length }, (_length, i) => i);
const randomPersonnelCount = () => Math.floor((Math.random() * (11 - 1)) + 1);
const randomSliceCount = () => Math.floor((Math.random() * (4 - 1)) + 1);
const randomDay = () => Math.floor((Math.random() * (30 - 1)) + 1);
const randomParticipants = (length) => range(length).map((i) => `user${i + 1}`);

module.exports = () => {
  const groups = range(25)
    .map((i) => {
      const count = i + 1;
      const user = `user${count}`;

      const personnel = randomPersonnelCount();
      const subtract = randomSliceCount();
      const day = randomDay();
      const participants = randomParticipants(personnel - subtract);
      const isModerator = participants.includes(user);

      return {
        id: i,
        title: `스터디를 소개합니다.${count}`,
        moderatorId: user,
        applyEndDate: `2020-12-${day}`,
        participants: isModerator ? participants : [...participants, user],
        personnel,
        contents: `우리는 이것저것 합니다.${count}`,
        tags: ['JavaScript', 'React', 'Algorithm'],
      };
    });

  return { groups };
};
