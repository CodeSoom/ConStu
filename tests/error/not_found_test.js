Feature('사용자는 존재하지 않는 페이지에 접근할 수 있다.');

const step = codeceptjs.container.plugins('commentStep');

const Given = (given) => step`${given}`;
const When = (when) => step`${when}`;
const Then = (then) => step`${then}`;

Scenario('존재하지 않는 페이지로 이동한 경우', ({ I }) => {
  Given('메인 페이지에서');
  I.amOnPage('/');

  When('존재하지 않는 페이지로 이동하면');
  I.amOnPage('/not-found');

  Then('404 페이지로 이동한다');
  I.see('아무것도 없어요!');
  I.see('홈으로');
});

Scenario('존재하지 않는 페이지에서 "홈으로" 버튼을 클릭한 경우', ({ I }) => {
  Given('존재하지 않는 페이지에서');
  I.amOnPage('/not-found');

  When('"홈으로" 버튼을 클릭하면');
  I.click('홈으로');

  Then('메인 페이지로 이동한다.');
  I.seeCurrentUrlEquals('/');
});
