(function () {
  'use strict';

  angular.module('LunchCheck', []).controller('LunchCheckController', ['$scope', function($scope) {
    $scope.lunchMenu = "";
    $scope.message = "";

    $scope.performCheck = function() {
      if (!$scope.lunchMenu || $scope.lunchMenu.trim() === "") {
        $scope.message = 'Please enter data first';
        return;
      }

      var items = $scope.lunchMenu.split(',');
      if (items.length <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    };
  }]);

})();
