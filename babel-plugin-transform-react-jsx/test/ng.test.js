const path = require('path')
const pluginTester = require('babel-plugin-tester').default;
const plugin = require('../lib/index').default;

pluginTester({
    plugin,
    title: 'Default',
    fixtures: path.join(__dirname, 'ng-fixtures'),
    snapshot: true
});
