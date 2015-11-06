(function(){
  'use strict';
  angular.module('chromecastTv')
  .directive('dropzone',function(){
    return {
      restrict : 'EA',
      templateUrl : 'directives/dropzone/dropzone.html',
      link : function(scope, element){

      },
      controller : function(){
        
      }
    };

  });
})();
