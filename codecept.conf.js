const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './test/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true,
      windowSize: '1200x900'
    }
  },
  bootstrap: null,
  mocha: {},
  name: 'assignment-1-2',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}
