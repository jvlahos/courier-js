Package.describe({
  name: 'list-grouper',
  summary: 'Port of the list-grouper function from Krstffr',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('list-grouper.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('list-grouper');
  api.addFiles('list-grouper-tests.js');
});
