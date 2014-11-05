'use strict';

var api = {
  category: function($, name){
    var cat = $('<li class=category>');
    cat.append($('<span class=category-name>').text(name));
    cat.append(api.list($));
    cat.append(api.form($));
    return cat;
  },
  form: function($){
    return $('<form class=add-subcategory><input name=name><input type=submit></form>');
  },
  list: function($){
    return $('<ul class=category-children></ul>');
  }
};

module.exports = api;
