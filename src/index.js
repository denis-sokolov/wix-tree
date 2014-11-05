'use strict';

var promise = require('avow');

var html = require('./html');

var add = function($cat, obj){
  var $ = $cat.constructor;
  $cat.children('.category-children')
    .append(html.category($, obj.name));
};

module.exports = function($container){
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
    resolve();
  });
};
