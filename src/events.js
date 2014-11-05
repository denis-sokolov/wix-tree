'use strict';

var add = require('./add');

module.exports = function($){
  $('body').on('submit', '.wix-tree .add-subcategory', function(e){
    e.preventDefault();
    var form = $(this);
    var cat = form.closest('.category, .wix-tree');
    add.single(cat, {
      name: form.find('[name="name"]').val()
    });
  });
};
