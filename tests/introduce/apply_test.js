Feature('스터디에 대해 신청과 작성자는 신청자에 대한 관리를 할 수 있다.');

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

Scenario('올바르게 신청서를 작성한 경우', ({ I, login }) => {
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

Scenario('신청서 작성 시 작성하지 않은 항목이 존재하는 경우', ({ I, login }) => {
  session('스터티 소개글 작성자가 아닌 사용자', () => {
    Given('로그인해서 작성된 스터디 소개글로 이동해서');
    login('user2');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"신청하기" 버튼을 클릭한 뒤 스터디 신청서를 작성 하지 않은 채 "확인" 버튼을 클릭');
    I.see('신청하기');
    I.click('신청하기');
    I.fillField('#study-want', '테스트 신청');
    I.click('확인');

    Then('작성하지 않은 항목의 테두리가 붉은색으로 변경된다.');
    I.seeCssPropertiesOnElements('#apply-reason', {
      border: '2px solid rgb(255, 135, 135)',
    });
  });
});

Scenario('신청서 작성 페이지에서 "취소" 버튼을 누를 경우', ({ I, login }) => {
  session('스터티 소개글 작성자가 아닌 사용자', () => {
    Given('로그인해서 작성된 스터디 소개글로 이동해서');
    login('user2');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"신청하기" 버튼을 클릭한 뒤 "취소" 버튼을 클릭');
    I.see('신청하기');
    I.click('신청하기');
    I.click('취소');

    Then('스터디 참여 신청서가 보이지 않는다.');
    I.dontSee('스터디 참여 신청서');
  });
});

Scenario('신청서 작성 후 "신청 취소" 버튼을 누를 경우', ({ I, login }) => {
  session('스터티 소개글 작성자가 아닌 사용자', () => {
    Given('로그인해서 작성된 스터디 소개글로 이동해서');
    login('user2');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"신청하기" 버튼을 클릭한 뒤 스터디 신청서를 작성 후 "확인" 버튼을 클릭하고 "신청 취소" 버튼을 클릭하면');
    I.see('신청하기');
    I.click('신청하기');
    I.fillField('#apply-reason', '테스트 신청');
    I.fillField('#study-want', '테스트 신청');
    I.click('확인');
    I.waitForText('신청 취소');
    I.click('신청 취소');

    Then('"스터디 그룹 신청을 취소하시겠습니까?" 메시지와 확인 창이 보이고 "확인" 버튼을 클릭하면 신청이 취소되고 "신청하기" 버튼이 보인다.');
    I.see('스터디 그룹 신청을 취소하시겠습니까?');
    I.click('확인');
    I.see('신청하기');
  });
});

Scenario('스터디 신청자 목록에 아무도 존재하지 않는 경우', ({ I }) => {
  Given('스터디 소개글 작성자가');

  When('"스터디 참여 승인하기" 버튼을 클릭하면');
  I.click('스터디 참여 승인하기');

  Then('"신청자가 존재하지 않습니다."가 보인다.');
  I.see('신청자가 존재하지 않습니다.');
  I.click('닫기');
});

Scenario('스터디 신청자 목록에 신청자가 존재하는 경우', ({ I, login }) => {
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

  session('스터디 소개글 작성자', () => {
    Given('스터디 소개글 작성자로 로그인 후 해당 개시글로 이동해서');
    login('user');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"스터디 참여 승인하기" 버튼을 클릭하면');
    I.click('스터디 참여 승인하기');

    Then('신청한 신청자 이메일과 승인 여부, 신청서가 보인다.');
    I.see('test@test.com');
    I.see('승인하기');
    I.click('.application-view');
    I.see('신청하게 된 이유');
    I.see('스터디를 통해 얻고 싶은 것은 무엇인가요?');
  });
});

Scenario('스터디 신청자 목록에 승인 되지 않은 신청자를 승인하는 경우', ({ I, login }) => {
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

  session('스터디 소개글 작성자', () => {
    Given('스터디 소개글 작성자로 로그인 후 해당 개시글로 이동해서');
    login('user');
    I.waitInUrl('/', 2);
    I.click('테스트 제목');

    When('"스터디 참여 승인하기" 버튼을 클릭한 뒤 "승인하기"버튼을 클릭하면');
    I.click('스터디 참여 승인하기');
    I.click('승인하기');

    Then('"1명이 승인을 기다리고 있습니다!" 메시지가 보이지 않고, "취소하기" 버튼이 보인다.');
    I.dontSee('1명이 승인을 기다리고 있습니다!');
    I.see('취소하기');
  });
});
