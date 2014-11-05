'use strict';

var promise = require('avow');

var html = require('./html');

var add = function($cat, obj){
  if (obj.forEach) {
    obj.forEach(function(el){
      add($cat, el);
    });
  } else {
    if (typeof obj === 'string') obj = {name: obj};
    var $ = $cat.constructor;
    var $child = html.category($, obj.name);
    $cat.children('.category-children')
      .append($child);
    if (obj.children)
      add($child, obj.children);
  }
};

var addIterative = function($category, obj){
  var $ = $category.constructor;
  var queue = [];
  queue.push([$category, obj]);

  var processSingleChild = function($cat, curr){
    if (typeof curr === 'string') curr = {name: curr};
    var $curr = html.category($, curr.name);
    $cat.append($curr);
    if (curr.children)
      queue.push([$curr, curr.children]);
  };

  while (queue.length) {
    var task = queue.shift();
    var $cat = task[0];
    var children = task[1];
    children.forEach(processSingleChild.bind(null, $cat));
  }
};

module.exports = function($container, structure){
  var $ = $container.constructor;
  return promise(function(resolve){
    $container
      .append(html.list($))
      .append(html.form($))
      .addClass('wix-tree');
    $('body').on('submit', '.wix-tree .add-subcategory', function(e){
      e.preventDefault();
      var form = $(this);
      var cat = form.closest('.category, .wix-tree');
      add(cat, {
        name: form.find('[name="name"]').val()
      });
    });
    if (structure)
      add($container, structure);
    resolve();
  });
};
