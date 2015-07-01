var angularOtobox = angular.module('angular-otobox', []);


/**
 * @name otobox
 * @summary setts configs of otobox from attribiutes of element
 * @param $attrs - all the configs must be hardcoded on element
 **/
angularOtobox.directive("otobox", ['$timeout', '$compile', function ($timeout, $compile) {
  return {
    scope: {
      otobox: "="
    },
    require: "?otoboxConfig",
    link: function ($scope, $element, $attrs, otoboxConfigCtrl) {
      // wating untile template generated
      $timeout(function () {
        // adding activator
        var config = (otoboxConfigCtrl) ? otoboxConfigCtrl.getConfig() : {};
        config.key = (config.key) ? config.key : 'otobox';
        // initiating otobox for the current element
        $scope.otobox[config.key] = new otobox($element[0]);

        if (config.activators instanceof Array) {
          // Adding multiple activators for a single emenet is only possible using otoboxConfig directive
          for (var j = 0; j < config.activators.length; j++) {
            $scope.otobox[config.key].addActivator(config.activators[j]);
            $scope.otobox[config.key].setOption('useText', config.activators[j].setText);
          }
        } else {

          config.activators = {
            name: $attrs.otobox,
            key: $attrs.otoboxKey,
            customChoice: $attrs.otoboxCustomChoice || false,
            includeKey: $attrs.otoboxIncludeKey || true,
            allowedChars: new RegExp($attrs.otoboxAllowedChars),
            source: $attrs.otoboxSource,
            displayKey: $attrs.otoboxDisplayKey,
            valueKey: $attrs.otoboxValueKey,
            setText: $attrs.setText || true
          };//config

          $scope.otobox[config.key].setOption('useText', config.activators.setText).addActivator(config.activators);
        }
        $scope.otobox[config.key].bind('update', function () {
          $element.triggerHandler('input');
        });
      });
    }
  }
}]);
