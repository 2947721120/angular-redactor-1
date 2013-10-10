(function () {
	"use strict";

	var module = angular.module('myApp', []);

	module.controller("myCtrl", [
		'$scope',
		function ($scope) {
			$scope.text = "<strong>Hello world</strong>";
		}
	]);

	module.directive("redactor", [
		function () {
			return {
				restrict: 'A',
				require: 'ngModel',

				link: function ($scope, element, attrs, controller) {
					var instance,
						initialised = false;
					
					// redactor
					instance = element.redactor({
						syncAfterCallback: function(html) {
							// view -> model
							if (initialised && controller.$viewValue !== html) {
								$scope.$apply(function () {
									controller.$setViewValue(html);
								});
							}
						}
					}).redactor('getObject');

					// model -> view
					controller.$render = function () {
						instance.set(controller.$viewValue || "");
						initialised = true;
					};

					// destroy
					$scope.$on('$destroy', function (event, args) {
						instance.destroy();
						instance = null;
					});
				}
			};
		}
	]);
})();
