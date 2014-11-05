'use strict';

var lib = require('./lib');

var engine = require('..');

lib.test('initialize with fruits', function(t, $){
  t.plan(2);
  return engine($('.tree'), [
    {name: 'Fruits', children: [
      'Peach', 'Banana', {name: 'Citrus', children: [
        'Orange', 'Lemon'
      ]}
    ]}
  ]).then(function(){
    t.equal($('.category-name').first().text(), 'Fruits');
    t.equal($('.category .category .category .category-name').text(), 'OrangeLemon');
  });
});
