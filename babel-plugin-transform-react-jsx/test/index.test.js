const path = require("path");
const runner = require("@babel/helper-transform-fixture-test-runner").default;

runner(path.join(__dirname, 'fixtures/pure'), 'pure');
runner(path.join(__dirname, 'fixtures/autoImport'), 'autoImport');
runner(path.join(__dirname, 'fixtures/react'), 'react');
runner(path.join(__dirname, 'fixtures/regression'), 'regression');
runner(path.join(__dirname, 'fixtures/removed-options'), 'removed-options');
runner(path.join(__dirname, 'fixtures/runtime'), 'runtime');
runner(path.join(__dirname, 'fixtures/sourcemaps'), 'sourcemaps');
runner(path.join(__dirname, 'fixtures/spread-transform'), 'spread-transform');