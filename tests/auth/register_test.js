Feature('사용자가 스터디 개설 및 스터디 참여를 하기 위해 회원가입을 할 수 있다.');

Scenario('이메일 또는 비밀번호, 비밀번호 확인 필드에 입력을 하지 않은 경우', ({ I }) => {
  // Given - 회원가입 페이지에서
  I.amOnPage('/register');

  // When - 필드에 입력을 하지 않고 회원가입 버튼을 클릭하면
  I.fillField('input[name=userEmail]', '');
  I.fillField('input[name=password]', '');
  I.fillField('input[name=passwordConfirm]', '123');

  I.click('button[type=submit]');

  // Then - "입력이 안된 사항이 있습니다." 메시지가 보인다.
  I.see('입력이 안된 사항이 있습니다.');
});

Scenario('이메일 형식으로 입력하지 않은 경우', ({ I }) => {
  // Given - 회원가입 페이지에서
  I.amOnPage('/register');

  // When - 이메일 형식이 아닌 형태로 입력 후 회원가입 버튼을 클릭하면
  I.fillField('input[name=userEmail]', 'test');
  I.fillField('input[name=password]', '123123');
  I.fillField('input[name=passwordConfirm]', '123123');

  I.click('button[type=submit]');

  // Then - "이메일 형식으로 입력하세요." 메시지가 보인다.
  I.see('이메일 형식으로 입력하세요.');
});

Scenario('비밀번호가 6자리 이하일 경우', ({ I }) => {
  // Given - 회원가입 페이지에서
  I.amOnPage('/register');

  // When - 6자리 이하인 비밀번호를 입력 후 회원가입 버튼을 클릭하면
  I.fillField('input[name=userEmail]', 'test@test.com');
  I.fillField('input[name=password]', '1233');
  I.fillField('input[name=passwordConfirm]', '1233');

  I.click('button[type=submit]');

  // Then - "6자리 이상의 비밀번호를 입력하세요." 메시지가 보인다.
  I.see('6자리 이상의 비밀번호를 입력하세요.');
});

Scenario('비밀번호 필드와 비밀번호 확인 필드가 일치하지 않은 경우', ({ I }) => {
  // Given - 회원가입 페이지에서
  I.amOnPage('/register');

  // When - 서로 일치하지 않는 비밀번호와 비밀번호 확인를 입력 후 회원가입 버튼을 클릭하면
  I.fillField('input[name=userEmail]', 'test@test.com');
  I.fillField('input[name=password]', '1233');
  I.fillField('input[name=passwordConfirm]', '12331');

  I.click('button[type=submit]');

  // Then - "비밀번호가 일치하지 않습니다." 메시지가 보인다.
  I.see('비밀번호가 일치하지 않습니다.');
});

Scenario('이미 가입된 이메일인 경우 경우', ({ I }) => {
  // Given - 회원가입 페이지에서
  I.amOnPage('/register');

  // When - 이미 가입된 이메일을 입력 후 회원가입 버튼을 클릭하면
  I.fillField('input[name=userEmail]', 'test@test.com');
  I.fillField('input[name=password]', '123123');
  I.fillField('input[name=passwordConfirm]', '123123');

  I.click('button[type=submit]');

  // Then - "이미 가입된 사용자입니다." 메시지가 보인다.
  I.see('이미 가입된 사용자입니다.');
});
