Feature('스터디 소개 페이지에서 후기를 작성 및 후기를 볼 수 있다.');

const step = codeceptjs.container.plugins('commentStep');

const Given = (given) => step`${given}`;
const When = (when) => step`${when}`;
const Then = (then) => step`${then}`;

const createAfterOneMinutesDate = () => {
  const date = new Date();

  date.setMinutes(date.getMinutes() + 1);

  return date.toString();
};

Before(({ I, login }) => {
  Given('test@test.com이라는 유저가 로그인 후 스터디를 개설한다');
  login('user');
  I.click('스터디 개설하기');
  I.fillField('input[name=title]', '테스트 제목');
  I.clearField('#application-deadline');
  I.fillField('#application-deadline', createAfterOneMinutesDate());
  I.clearField('#participants-number');
  I.fillField('#participants-number', 2);
  I.fillField('.public-DraftEditor-content', 'testtest');
  I.fillField('input[name=tagForm]', '테스트 태그');
  I.pressKey('Enter');
  I.click('등록하기');
  I.waitInUrl('/introduce', 2);

  session('스터티 소개글 작성자가 아닌 사용자', () => {
    Given('로그인해서 작성된 스터디 소개글로 이동해서');
    login('user2');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"신청하기" 버튼을 클릭한 뒤 스터디 신청서를 작성 후 "확인" 버튼을 클릭');
    I.see('신청하기');
    I.click('신청하기');
    I.fillField('#apply-reason', '테스트 신청');
    I.fillField('#study-want', '테스트 신청');
    I.click('확인');

    Then('"승인 대기 중.."이 보인다.');
    I.see('승인 대기 중..');
  });
});

After(({ I }) => {
  I.click('삭제');
  I.click('확인');
});

Scenario('스터디 소개글이 모집 마감 상태가 아닌 경우', ({ I, login }) => {
  session('스터디 참여자인 사용자', () => {
    Given('로그인해서');
    login('user2');

    When('작성된 스터디 소개글로 이동하면');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    Then('후기 섹션이 보이지 않는다.');
    I.dontSee('후기');
  });
});

Scenario('스터디 참여자가 올바르게 후기를 작성하는 경우', ({ I, login }) => {
  session('스터디 소개글 작성자', () => {
    Given('스터디 소개글 작성자로 로그인 후 해당 소개글로 이동해서');
    login('user');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"스터디 참여 승인하기" 버튼을 클릭해서 "승인하기" 버튼을 클릭하면');
    I.click('스터디 참여 승인하기');
    I.click('승인하기');

    Then('"취소하기" 버튼이 보인다.');
    I.see('취소하기');
  });

  session('스터디 참여자인 사용자', () => {
    Given('로그인해서 작성된 스터디 소개글로 이동해서');
    login('user2');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('스터디 후기를 작성한 후 "후기 등록하기" 버튼을 클릭하면');
    I.fillField('textarea[name=content]', '테스트 후기 작성');
    I.click('후기 등록하기');

    Then('작성한 후기와 후기 통계가 보이고 후기 작성 폼은 보이지 않는다.');
    I.see('테스트 후기 작성');
    I.seeElement('#average-review');
    I.dontSee('스터디 후기를 작성해주세요!');
  });
});

Scenario('스터디 참여자가 올바르게 후기를 삭제하는 경우', ({ I, login }) => {
  session('스터디 소개글 작성자', () => {
    Given('스터디 소개글 작성자로 로그인 후 해당 소개글로 이동해서');
    login('user');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"스터디 참여 승인하기" 버튼을 클릭해서 "승인하기" 버튼을 클릭하면');
    I.click('스터디 참여 승인하기');
    I.click('승인하기');

    Then('"취소하기" 버튼이 보인다.');
    I.see('취소하기');
  });

  session('스터디 참여자인 사용자', () => {
    Given('로그인해서 작성된 스터디 소개글로 이동해서');
    login('user2');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('스터디 후기를 작성한 후 "후기 등록하기" 버튼을 클릭하고 다시 스터디 후기를 삭제하면');
    I.fillField('textarea[name=content]', '테스트 후기 작성');
    I.click('후기 등록하기');
    I.see('테스트 후기 작성');
    I.click('svg[name="closeIcon"]');

    Then('작성한 후기와 후기 통계가 보이지 않고 후기 작성 폼은 보인다.');
    I.dontSee('테스트 후기 작성');
    I.dontSeeElement('#average-review');
    I.see('스터디 후기를 작성해주세요!');
  });
});

Scenario('비로그인 사용자가 모집 마감된 스터디의 빈 후기 섹션을 보는 경우', ({ I, login }) => {
  session('스터디 소개글 작성자', () => {
    Given('스터디 소개글 작성자로 로그인 후 해당 소개글로 이동해서');
    login('user');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"스터디 참여 승인하기" 버튼을 클릭해서 "승인하기" 버튼을 클릭하면');
    I.click('스터디 참여 승인하기');
    I.click('승인하기');

    Then('"취소하기" 버튼이 보인다.');
    I.see('취소하기');
  });

  session('비 로그인 사용자', () => {
    Given('메인 페이지에서');
    I.amOnPage('/');

    When('해당 스터디 소개글로 이동하면');
    I.click('테스트 제목');

    Then('"등록된 후기가 존재하지 않습니다!"가 보이고 후기 작성 폼이 보이지 않는다.');
    I.see('등록된 후기가 존재하지 않습니다!');
    I.dontSee('스터디 후기를 작성해주세요!');
  });
});
