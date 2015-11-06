(function(){
  'use strict';

  document.addEventListener('dragover',function(event){
    event.preventDefault();
    return false;
  },false);

  document.addEventListener('drop',function(event){
    event.preventDefault();
    console.log('droped file');
    var file = event.dataTransfer.files[0].path;
    var chromecast = require('../server/chromecast');
    chromecast(file);
    return false;
  },false);

  var app = angular.module('chromecastTv',[]);

  app.controller('mainController',['$scope', function($scope){

  }]);
})();
