/* eslint-disable no-plusplus */

module.exports = () => {
  const data = { groups: [] };

  for (let i = 0; i < 30; i++) {
    const randomMonth = Math.floor((Math.random() * (11 - 1)) + 1);
    const randomDay = Math.floor((Math.random() * (30 - 1)) + 1);

    data.groups.push({
      id: i,
      moderatorId: `user${i}`,
      title: `스터디를 소개합니다. ${i}`,
      applyStartDate: `2020-${randomMonth}-${randomDay}`,
      applyEndDate: '2020-12-3',
      personnel: randomMonth,
      contents: `우리는 이것저것 합니다.${i}`,
      tags: ['JavaScript', 'React', 'Algorithm'],
    });
  }
  return data;
};
