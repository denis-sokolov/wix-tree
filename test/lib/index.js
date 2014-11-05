'use strict';

var fs = require('fs');

var jsdom = require('jsdom');
var jqueryFactory = require('jquery');
var promise = require('avow');
var tape = require('tape');

var tree = require('../..');

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
      var res = cb(testApi, $);
      if (res.then)
        res.then(null, function(err){
          testApi.fail(err.message);
        });
    });
  });
};

api.test.skip = tape.skip;

api.tree = function(name, cb){
  api.test(name, function(testApi, $){
    return tree($('.tree')).then(function(){
      cb(testApi, $);
    });
  });
};

api.tree.skip = tape.skip;

api.waitUntilTrue = function(test){
  return promise(function(resolve){
    var interval = setInterval(function(){
      var res = test();
      if (res) {
        clearTimeout(timeout);
        clearInterval(interval);
        resolve();
      }
    }, 5);

    var timeout = setTimeout(function(){
      clearInterval(interval);
    }, 1000);
  });
};

module.exports = api;
