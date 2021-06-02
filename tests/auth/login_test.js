Feature('사용자가 스터디 개설 및 스터디 참여를 하기 위해 로그인을 할 수 있다.');

Scenario('올바르게 로그인에 성공한 경우', ({ I }) => {
  // Given - 로그인 페이지에서
  I.amOnPage('/login');

  // When - 이메일, 비밀번호를 입력 후 로그인 버튼을 클릭하면
  I.fillField('input[name=userEmail]', 'test@test.com');
  I.fillField('input[name=password]', '123123');

  I.click('button[type=submit]');

  // Then - 메인 페이지로 이동한다.
  I.seeCurrentUrlEquals('/');
});

Scenario('이메일 또는 비밀번호 필드에 입력을 하지 않은 경우', ({ I }) => {
  // Given - 로그인 페이지에서
  I.amOnPage('/login');

  // When - 필드에 입력을 하지 않고 로그인 버튼을 클릭하면
  I.fillField('input[name=userEmail]', '');
  I.fillField('input[name=password]', '');

  I.click('button[type=submit]');

  // Then - "입력이 안된 사항이 있습니다." 메시지가 보인다.
  I.see('입력이 안된 사항이 있습니다.');
});

Scenario('이메일 형식으로 입력하지 않은 경우', ({ I }) => {
  // Given - 로그인 페이지에서
  I.amOnPage('/login');

  // When - 이메일 형식이 아닌 형태로 입력 후 로그인 버튼을 클릭하면
  I.fillField('input[name=userEmail]', 'test');
  I.fillField('input[name=password]', '123123');

  I.click('button[type=submit]');

  // Then - "이메일 형식으로 입력하세요." 메시지가 보인다.
  I.see('이메일 형식으로 입력하세요.');
});

Scenario('비밀번호가 일치하지 않은 경우', ({ I }) => {
  // Given - 로그인 페이지에서
  I.amOnPage('/login');

  // When - 일치하지 않는 비밀번호를 입력 후 로그인 버튼을 클릭하면
  I.fillField('input[name=userEmail]', 'test@test.com');
  I.fillField('input[name=password]', '11');

  I.click('button[type=submit]');

  // Then - "비밀번호가 일치하지 않습니다." 메시지가 보인다.
  I.see('비밀번호가 일치하지 않습니다.');
});

Scenario('존재하지 않는 이메일인 경우 경우', ({ I }) => {
  // Given - 로그인 페이지에서
  I.amOnPage('/login');

  // When - 존재하지 않는 이메일을 입력 후 로그인 버튼을 클릭하면
  I.fillField('input[name=userEmail]', 'test@test.net');
  I.fillField('input[name=password]', '123123');

  I.click('button[type=submit]');

  // Then - "비밀번호가 일치하지 않습니다." 메시지가 보인다.
  I.see('가입된 사용자가 아닙니다.');
});
