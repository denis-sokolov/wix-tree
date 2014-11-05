'use strict';

var promise = require('avow');

var add = require('./add');
var html = require('./html');

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
      add.single(cat, {
        name: form.find('[name="name"]').val()
      });
    });
    if (structure)
      add.many($container, structure);
    resolve();
  });
};
