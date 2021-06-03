Feature('로그인 한 사용자는 스터디를 개설할 수 있다.');

const step = codeceptjs.container.plugins('commentStep');

const Given = () => step`Given`;
const When = () => step`When`;
const Then = () => step`Then`;

const createTomorrowDate = () => {
  const date = new Date();

  date.setDate(date.getDate() + 1);

  return date.toString();
};

Before(({ login }) => {
  Given('로그인한 사용자만 스터디를 개설할 수 있다.');
  login('user');
});

Scenario('올바르게 스터디 개설을 한 경우', async ({ I }) => {
  Given('스터디 개설 페이지에서');
  I.click('스터디 개설하기');

  When('스터디에 관한 정보들을 작성한 뒤 "등록하기" 버튼을 클릭하면');
  I.fillField('input[name=title]', '테스트 제목');
  I.clearField('#application-deadline');
  I.fillField('#application-deadline', createTomorrowDate());
  I.clearField('#participants-number');
  I.fillField('#participants-number', 2);
  I.fillField('.public-DraftEditor-content', 'testtest');
  I.fillField('input[name=tagForm]', '테스트 태그');
  I.pressKey('Enter');
  I.click('등록하기');

  Then('해당 작성 페이지로 이동한다');
  const url = await I.grabCurrentUrl();
  const splitUrl = url.split('/');

  I.seeCurrentUrlEquals(`/introduce/${splitUrl[splitUrl.length - 1]}`);

  // After - 해당 게시글을 삭제한다.
  I.click('삭제');
  I.click('확인');
});

Scenario('제목이 입력되지 않았을 경우', ({ I }) => {
  Given('스터디 개설 페이지에서');
  I.click('스터디 개설하기');

  When('제목을 작성하지 않고 "등록하기" 버튼을 클릭하면');
  I.fillField('input[name=title]', '');
  I.click('등록하기');

  Then('"제목을 입력해주세요." 메시지가 보인다.');
  I.see('제목을 입력해주세요.');
});

Scenario('모잡 마감 날짜가 입력되지 않았을 경우', ({ I }) => {
  Given('스터디 개설 페이지에서');
  I.click('스터디 개설하기');

  When('모잡 마감 날짜를 작성하지 않고 "등록하기" 버튼을 클릭하면');
  I.fillField('input[name=title]', '테스트 제목');
  I.fillField('#application-deadline', '');
  I.click('등록하기');

  Then('"모집 마감 일자를 입력해주세요." 메시지가 보인다.');
  I.see('모집 마감 일자를 입력해주세요.');
});

Scenario('참여 인원 수가 잘못 입력되었을 경우', ({ I }) => {
  Given('스터디 개설 페이지에서');
  I.click('스터디 개설하기');

  When('모잡 마감 날짜를 작성하지 않고 "등록하기" 버튼을 클릭하면');
  I.fillField('input[name=title]', '테스트 제목');
  I.clearField('#application-deadline');
  I.fillField('#application-deadline', createTomorrowDate());
  I.fillField('#participants-number', 0);
  I.click('등록하기');

  Then('"참여 인원 수를 입력하지 않았거나, 잘못된 값을 입력하였습니다." 메시지가 보인다.');
  I.see('참여 인원 수를 입력하지 않았거나, 잘못된 값을 입력하였습니다.');
});

Scenario('스터디 개설 내용을 작성하지 않은 경우', ({ I }) => {
  Given('스터디 개설 페이지에서');
  I.click('스터디 개설하기');

  When('스터디 개설 내용을 작성하지 않고 "등록하기" 버튼을 클릭하면');
  I.fillField('input[name=title]', '테스트 제목');
  I.clearField('#application-deadline');
  I.fillField('#application-deadline', createTomorrowDate());
  I.fillField('#participants-number', 2);
  I.click('등록하기');

  Then('"내용을 입력해주세요." 메시지가 보인다.');
  I.see('내용을 입력해주세요.');
});

Scenario('태그를 입럭하지 않은 경우', ({ I }) => {
  Given('스터디 개설 페이지에서');
  I.click('스터디 개설하기');

  When('태그를 작성하지 않고 "등록하기" 버튼을 클릭하면');
  I.fillField('input[name=title]', '테스트 제목');
  I.clearField('#application-deadline');
  I.fillField('#application-deadline', createTomorrowDate());
  I.fillField('#participants-number', 2);
  I.fillField('.public-DraftEditor-content', 'testtest');
  I.click('등록하기');

  Then('"태그를 입력하세요." 메시지가 보인다.');
  I.see('태그를 입력하세요.');
});

Scenario('올바르게 태그 폼에 태그를 작성 후 삭제하는 경우', ({ I }) => {
  Given('스터디 개설 페이지에서');
  I.click('스터디 개설하기');

  When('태그를 작성 후 "삭제" 버튼을 클릭하면');
  I.fillField('input[name=tagForm]', '테스트 태그');
  I.pressKey('Enter');
  I.see('테스트 태그');
  I.click('span[name=closeButton]');

  Then('"테스트 태그" 태그가 보이지 않는다.');
  I.dontSee('테스트 태그');
});

Scenario('올바르게 취소 버튼을 클릭하는 경우', ({ I }) => {
  Given('스터디 개설 페이지에서');
  I.click('스터디 개설하기');

  When('"취소" 버튼을 클릭하면');
  I.click('취소');

  Then('메인 페이지로 이동한다.');
  I.seeInCurrentUrl('/');
});
