var angularOtobox = angular.module('angular-otobox', []);
var s = new Array();
var i = 0;
angularOtobox.directive("otobox", function () {
  return function ($scope, $element, $attrs) {
    console.log('otobox injectd', $attrs);
    s[i] = new otobox($element[0]); 
    s[i].addActivator({
        name: $attrs.otobox,
        key: $attrs.otoboxKey,
        customChoice: $attrs.otoboxCustomChoice || false,
        includeKey: $attrs.otoboxIncludeKey || true,
        allowedChars: new RegExp($attrs.otoboxAllowedChars),
        source: $attrs.otoboxSource
    });
    i ++;
  }
});