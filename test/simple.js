'use strict';

var lib = require('./lib');

var engine = require('..');

lib.test('simple api call', function(t, $){
  engine($('.tree'));
  t.end();
});

