Feature('스터디 상세 페이지에 대한 정보를 볼 수 있다.');

const step = codeceptjs.container.plugins('commentStep');

const Given = (given) => step`${given}`;
const When = (when) => step`${when}`;
const Then = (then) => step`${then}`;

const createTomorrowDate = () => {
  const date = new Date();

  date.setDate(date.getDate() + 1);

  return date.toString();
};

Before(({ I, login }) => {
  Given('test@test.com이라는 유저가 로그인 후 스터디를 개설한다');
  login('user');
  I.click('스터디 개설하기');
  I.fillField('input[name=title]', '테스트 제목');
  I.clearField('#application-deadline');
  I.fillField('#application-deadline', createTomorrowDate());
  I.clearField('#participants-number');
  I.fillField('#participants-number', 2);
  I.fillField('.public-DraftEditor-content', 'testtest');
  I.fillField('input[name=tagForm]', '테스트 태그');
  I.pressKey('Enter');
  I.click('등록하기');
  I.waitInUrl('/introduce', 2);
});

After(({ I }) => {
  I.click('삭제');
  I.click('확인');
});

Scenario('스터디 소개글 작성자가 올바르게 수정한 경우', async ({ I }) => {
  Given('해당 소개글 페이지로 이동해서');

  When('"수정" 버튼을 클릭한 뒤 "스터디 개설하기" 페이지로 이동한 뒤 제목을 수정 후 "수정하기" 버튼을 클릭하면');
  I.click('수정');
  I.seeCurrentUrlEquals('/write');
  I.fillField('input[name=title]', '테스트 제목입니다.');
  I.click('수정하기');

  Then('해당 수정한 페이지로 이동한 후 수정된 "테스트 제목입니다."가 보인다.');
  I.waitInUrl('/introduce', 2);
  const url = await I.grabCurrentUrl();
  const splitUrl = url.split('/');

  I.seeCurrentUrlEquals(`/introduce/${splitUrl[splitUrl.length - 1]}`);
  I.see('테스트 제목입니다.');
});

Scenario('로그인한 사용자가 소개글 작성자일 경우', ({ I }) => {
  Given('해당 소개글 페이지로 이동해서');

  When('로그인한 사용자가 작성자이면');

  Then('"스터디 참여 승인하기" 버튼이 보인다.');
  I.see('스터디 참여 승인하기');
});

Scenario('비 로그인 사용자가 소개글을 볼 경우', ({ I }) => {
  session('비 로그인 사용자', () => {
    Given('해당 스터디 소개글로 이동해서');
    I.amOnPage('/');
    I.click('테스트 제목');

    When('"신청하기" 버튼을 클릭하면');
    I.see('신청하기');
    I.click('신청하기');

    Then('"로그인 후 신청 가능합니다." 모달창이 보이고 게시글 "수정", "삭제" 버튼이 보이지 않는다.');
    I.see('로그인 후 신청 가능합니다.');
    I.click('확인');
    I.dontSee('수정');
    I.dontSee('삭제');
  });
});

Scenario('로그인한 사용자가 소개글 작성자가 아닐 경우', ({ I, login }) => {
  session('스터디 소개글 작성자가 아닌 사용자', () => {
    Given('로그인해서 작성된 스터디 소개글로 이동해서');
    login('user2');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"신청하기" 버튼을 클릭하면');
    I.see('신청하기');
    I.click('신청하기');

    Then('"스터디 참여 신청서" 모달창이 보이고 게시글 "수정", "삭제" 버튼이 보이지 않는다.');
    I.see('스터디 참여 신청서');
    I.see('신청하게 된 이유');
    I.see('스터디를 통해 얻고 싶은 것은 무엇인가요?');
    I.click('취소');
    I.dontSee('수정');
    I.dontSee('삭제');
  });
});

Scenario('모집이 마감된 스터디 소개글인 경우', ({ I }) => {
  session('비 로그인 사용자', () => {
    Given('모집이 마감된 스터디 소개글로 이동해서');
    I.amOnPage('/introduce/uBYP4s1jf9TWhdtYH4zu');

    When();

    Then('"모집 마감"이 보인다.');
    I.see('모집 마감');
  });
});

Scenario('승인이 거절된 스터디 소개글인 경우', ({ I, login }) => {
  session('거절된 로그인 사용자', () => {
    Given('거절된 사용자로 로그인해서');
    login('user');

    When('거절된 스터디 소개글에서');
    I.click('스터디 그룹 개설하기tetezzzzzzzz');

    Then('"승인 거절"이 보인다.');
    I.see('승인 거절');
  });
});

Scenario('로그인한 사용자가 모집이 마감된 스터디 소개글 작성자인 경우', ({ I, login }) => {
  session('스터디 소개글 작성자', () => {
    Given('스터디 소개글 사용자로 로그인해서');
    login('user');

    When('마감된 스터디 소개글에서');
    I.click('스터디를 모집');

    Then('"스터디를 진행해주세요!"이 보인다.');
    I.see('스터디를 진행해주세요!');
  });
});
