'use strict';

var lib = require('./lib');

var engine = require('..');

lib.test('simple api call does not fail', function(t, $){
  t.plan(1);
  engine($('.tree'));
  t.pass();
});

lib.test('simple api call returns a promise', function(t, $){
  t.plan(1);
  engine($('.tree')).then(function(){
    t.pass();
  });
});

lib.tree('has .add-subcategory and .category-children', function(t, $){
  t.plan(2);
  t.equal($('.tree .add-subcategory').length, 1);
  t.equal($('.tree .category-children').length, 1);
});

lib.tree('add a single cat', function(t, $){
  t.plan(1);
  $('.tree .add-subcategory [name="name"]').val('test');
  $('.tree .add-subcategory').trigger('submit');
  lib.waitUntilTrue(function(){
    return $('.tree .category').length > 0;
  }).then(function(){
    t.equal($('.category-name').text(), 'test');
  });
});

lib.tree('add a grandchild', function(t, $){
  t.plan(1);
  $('.tree .add-subcategory [name="name"]').val('test');
  $('.tree .add-subcategory').trigger('submit');
  lib.waitUntilTrue(function(){
    return $('.tree .category').length > 0;
  }).then(function(){
    $('.tree .category .add-subcategory [name="name"]').val('test-grandchild');
    $('.tree .category .add-subcategory').trigger('submit');
    return lib.waitUntilTrue(function(){
      return $('.tree .category').length > 1;
    });
  }).then(function(){
    t.equal($('.category .category .category-name').text(), 'test-grandchild');
  });
});
