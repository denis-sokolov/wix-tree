'use strict';

var lib = require('./lib');

var engine = require('..');

lib.test('no duplicates for multiple trees', function(t, $){
  $('body').append('<div class=tree></div>');
  t.plan(1);
  engine($('.tree').first()).then(function(){
    return engine($('.tree').last());
  }).then(function(){
    $('.tree .add-subcategory [name="name"]').first().val('test');
    $('.tree .add-subcategory').first().trigger('submit');
    lib.waitUntilTrue(function(){
      return $('.tree .category').length > 0;
    }).then(function(){
      t.equal($('.tree .category').length, 1);
    });
  });
});
