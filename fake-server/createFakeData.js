const range = (length) => Array.from({ length }, (_length, i) => i);
const randomMonth = () => Math.floor((Math.random() * (11 - 1)) + 1);
const randomDay = () => Math.floor((Math.random() * (30 - 1)) + 1);

module.exports = () => {
  const groups = range(30)
    .map((i) => {
      const month = randomMonth();
      const day = randomDay();

      return {
        id: i,
        moderatorId: `user${i}`,
        title: `스터디를 소개합니다. ${i}`,
        applyStartDate: `2020-${month}-${day}`,
        applyEndDate: '2020-12-3',
        personnel: month,
        contents: `우리는 이것저것 합니다.${i}`,
        tags: ['JavaScript', 'React', 'Algorithm'],
      };
    });

  return { groups };
};
