const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/**/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost:8080',
      show: true,
      browser: 'chromium',
    },
  },
  include: {
    I: './tests/steps_file.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'ConStu',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
    commentStep: {
      enabled: true,
    },
    autoDelay: {
      enabled: true,
    },
    autoLogin: {
      enabled: true,
      saveToFile: true,
      inject: 'login',
      users: {
        user: {
          login: (I) => {
            I.amOnPage('/login');
            I.fillField('input[name=userEmail]', 'test@test.com');
            I.fillField('input[name=password]', '123123');
            I.click('button[type=submit]');
          },
          check: (I) => {
            I.seeCurrentUrlEquals('/');
            I.see('로그아웃');
            I.see('test@test.com');
          },
        },
      },
    },
  },
};
