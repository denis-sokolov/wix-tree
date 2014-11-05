'use strict';

var fs = require('fs');

var jsdom = require('jsdom');
var jqueryFactory = require('jquery');
var promise = require('avow');
var tape = require('tape');

var api = {};

api.jquery = function(options){
  options = options || {};
  options.fixture = options.fixture || 'simple';

  return promise(function(resolve){
    fs.readFile(__dirname+'/fixtures/'+options.fixture+'.html', function(err, html){
      var doc = jsdom.jsdom(html);
      var w = doc.parentWindow;
      jqueryFactory(w);
      resolve(w.jQuery);
    });
  });
};

api.test = function(name, cb){
  tape(name, function(testApi){
    api.jquery().then(function($){
      cb(testApi, $);
    });
  });
};

module.exports = api;
