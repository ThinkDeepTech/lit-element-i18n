module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    describe: false,
    beforeEach: false,
    afterEach: false,
    it: false,
    expect: false,
    sinon: false,
  },
};
