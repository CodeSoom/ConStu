import { tomorrow } from '../src/util/utils';

const studyGroup = {
  id: 1,
  title: '스터디를 소개합니다.2',
  moderatorId: 'user2',
  applyEndDate: tomorrow,
  participants: [],
  personnel: 2,
  contents: '우리는 이것저것 합니다.2',
  tags: [
    'JavaScript',
    'React',
    'Algorithm',
  ],
  createDate: new Date('2020/12/06'),
};

export default studyGroup;
