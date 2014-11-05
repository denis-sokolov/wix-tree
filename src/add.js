'use strict';

var html = require('./html');

var single = function($cat, obj){
  if (typeof obj === 'string') obj = {name: obj};
  var $ = $cat.constructor;
  var $child = html.category($, obj.name);
  $cat.children('.category-children')
    .append($child);
  return $child;
};

var addRecursive = function($category, children){
  children.forEach(function(curr){
    var $curr = single($category, curr);
    if (curr.children)
      addRecursive($curr, curr.children);
  });
};

var addIterative = function($category, children){
  var queue = [];
  queue.push([$category, children]);

  var processSingleChild = function($cat, curr){
    var $curr = single($cat, curr);
    if (curr.children)
      queue.push([$curr, curr.children]);
  };

  while (queue.length) {
    var task = queue.shift();
    var $cat = task[0];
    var currChildren = task[1];
    currChildren.forEach(processSingleChild.bind(null, $cat));
  }
};

module.exports = {
  single: single,
  many: addRecursive
};
