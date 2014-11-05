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
