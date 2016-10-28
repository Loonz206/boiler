// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl:'https://localhost:3000',

  rootElement:'body',

  resultJsonOutputFile: 'protractor.results.json',

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['spec/e2e/**/*.spec.js'],

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter'); // npm install jasmine-spec-reporter
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
  },

  allScriptsTimeout: 120000,

  getPageTimeout: 60000,


  // Options to be passed to Jasmine.
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    realtimeFailure: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true
  }
};
