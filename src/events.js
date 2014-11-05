'use strict';

var add = require('./add');

module.exports = function($){
  if ($('body').hasClass('wix-events')) return;
  $('body').addClass('wix-events');

  $('body').on('submit', '.wix-tree .add-subcategory', function(e){
    e.preventDefault();
    var form = $(this);
    var cat = form.closest('.category, .wix-tree');
    add.single(cat, {
      name: form.find('[name="name"]').val()
    });
  });
};
