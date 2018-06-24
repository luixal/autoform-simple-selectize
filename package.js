Package.describe({
  name: 'luixal:autoform-simple-selectize',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Selectize packaged ait it simplest form AutoForm',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/luixal/autoform-simple-selectize',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.6');
  api.use('ecmascript');
  api.use('aldeed:autoform@4.0.0 || 5.0.0 || 6.0.0');
  api.use('templating@1.3.2');

  api.addFiles(
    [
      'template/template.html',
      'template/template.js',
      'main.js'
    ],
    'client'
  );

  api.mainModule('autoform-simple-selectize.js');
});
