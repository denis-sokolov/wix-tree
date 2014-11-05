'use strict';

var promise = require('avow');

var add = require('./add');
var events = require('./events');
var html = require('./html');

module.exports = function($container, structure){
  var $ = $container.constructor;
  return promise(function(resolve){
    $container
      .append(html.list($))
      .append(html.form($))
      .addClass('wix-tree');
    if (structure)
      add.many($container, structure);
    events($);
    resolve();
  });
};
