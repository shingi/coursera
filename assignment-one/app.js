(function () {
  'use strict';

  angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

  function LunchCheckController() {
    var vm = this;
    vm.lunchMenu = "";
    vm.message = "";

    vm.performCheck = function() {
      if (!vm.lunchMenu || vm.lunchMenu.trim() === "") {
        vm.message = 'Please enter data first';
        return;
      }

      var items = vm.lunchMenu.split(',');
      if (items.length <= 3) {
        vm.message = "Enjoy!";
      } else {
        vm.message = "Too much!";
      }
    }
  }

})();
