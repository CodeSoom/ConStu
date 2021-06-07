Feature('Main Page');

const step = codeceptjs.container.plugins('commentStep');

const Given = (given) => step`${given}`;
const When = (when) => step`${when}`;
const Then = (then) => step`${then}`;

Scenario('로그인 후 메인 페이지에 대한 정보가 올바르게 보이는 경우', ({ I, login }) => {
  Given('메인 페이지에서');

  When('로그인 후');
  login('user');

  Then('"스터디 개설하기" 버튼과 사용자의 아이디가 보인다.');
  I.see('스터디 개설하기');
  I.see('test@test.com');
});

Scenario('로그아웃 버튼 클릭 후 메인 페이지에 대한 정보가 올바르게 보이는 경우', ({ I, login }) => {
  Given('로그인한 사용자가 메인 페이지에서');
  login('user');

  When('로그아웃 후');
  I.click('로그아웃');

  Then('"스터디 개설하기" 버튼과 "로그아웃" 버튼 보이지 않는다.');
  I.dontSee('스터디 개설하기');
  I.dontSee('로그아웃');
});

Scenario('올바르게 다크 모드로 변경되는 경우', ({ I }) => {
  Given('메인 페이지에서');
  I.amOnPage('/');

  When('theme toggle 버튼을 클릭하면');
  I.click({ css: '.react-toggle' });

  Then('body 배경색이 어두운 색으로 바뀐다.');
  I.seeCssPropertiesOnElements('body', {
    background: 'rgb(40, 44, 53) none repeat scroll 0% 0% / auto padding-box border-box',
  });
});
