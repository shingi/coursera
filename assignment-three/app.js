(function (){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems);

  function FoundItems() {
      var ddo = {
        scope: {
          foundItems: '<',
          onRemove: '&'
        },
        restrict: "E",
        templateUrl: 'foundItems.html'
      };
      return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var vm = this;

    vm.narrowItDown = function() {
      vm.found = [];
      if (vm.searchText) {
        MenuSearchService.getMatchedMenuItems(vm.searchText).then(function (results) {
          if (results && results.length > 0) {
            vm.found = results;
            vm.showMessage = false;
          } else {
            vm.showMessage = true;
          }
        });
      } else {
        vm.showMessage = true;
      }
    }

    vm.removeAt = function (index) {
      vm.found.splice(index, 1);
    }
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({ url: "https://davids-restaurant.herokuapp.com/menu_items.json" })
      .then(function (results) {
        var menuItems = results.data.menu_items;
        var foundItems = [];
        var r = new RegExp(searchTerm, "i");
        menuItems.forEach( function (item) {
          var found = item.description.match(r);
          if (found) {
            foundItems.push(item);
          }
        });
        return foundItems;
      }, function (response) {
        console.log('Error encountered while retrieving menu items.');
      });
    }
  }
})();
