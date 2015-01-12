var angularOtobox = angular.module('angular-otobox', []);
var s = new Array();
var i = 0;
/**
 * @name otobox
 * @summary setts configs of otobox from attribiutes of element
 * @param $attrs - all the configs must be hardcoded on element
 **/

angularOtobox.directive("otobox", function () {
  return {
    require: "?otoboxConfig",
    link: function ($scope, $element, $attrs, otoboxConfigCtrl) {
      // initiating otobox for the current element
      s[i] = new otobox($element[0]); 
      
      // adding activator
      var config = new Object();
      if ($scope.config instanceof Array) {
        // Adding multiple activators for a single emenet is only possible using otoboxConfig directive 
        for (var j = 0; j < $scope.config.length; j++) {
          config = {
              name: $scope.config[j].name,
              key: $scope.config[j].key,
              customChoice: $scope.config[j].customChoice || false,
              includeKey: $scope.config[j].includeKey || true,
              allowedChars: new RegExp($scope.config[j].allowedChars),
              source: $scope.config[j].source
          }
          s[i].addActivator(config);
        };
      } else {
        if (!$attrs.otoboxKey || !$attrs.otoboxSource || !$attrs.otoboxAllowedChars) {
          throw new Error('Some configs are mandatory! refer to https://github.com/alihaghighatkhah/angular-otobox');
        };
        config = {
            name: $attrs.otobox,
            key: $attrs.otoboxKey,
            customChoice: $attrs.otoboxCustomChoice || false,
            includeKey: $attrs.otoboxIncludeKey || true,
            allowedChars: new RegExp($attrs.otoboxAllowedChars),
            source: $attrs.otoboxSource
        }
        s[i].addActivator(config);
      }

      // next element
      i ++;
    }
  }
});