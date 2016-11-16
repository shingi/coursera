(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ShoppingListAddController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var vm = this;

    vm.items = ShoppingListCheckOffService.getItemsToBuy();
    //vm.isEmpty = false;

    vm.isEmpty = function() {
      return vm.items.length === 0;
    }

    vm.buy = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
      //vm.isEmpty = ShoppingListCheckOffService.hasNoItemsToBuy();
    }
  }

  ShoppingListAddController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var vm = this;

    vm.items = ShoppingListCheckOffService.getBoughtItems();

    vm.isEmpty = function() {
      return vm.items.length === 0;
    }
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
      { name: 'Cookies', quantity: 10 },
      { name: 'Body wash', quantity: 5 },
      { name: 'Bananas', quantity: 20 },
      { name: 'Oranges', quantity: 10 },
      { name: 'Apples', quantity: 15 }
    ];

    var boughtItems = [];

    service.getItemsToBuy = function() {
      return itemsToBuy;
    }

    service.getBoughtItems = function() {
      return boughtItems;
    }

    service.buyItem = function(itemIndex) {
      var item = itemsToBuy[itemIndex];
      itemsToBuy.splice(itemIndex, 1);
      boughtItems.push(item);
    }

    service.hasNoItemsToBuy = function() {
      return itemsToBuy.length === 0;
    }

    service.hasNoBoughtItems = function() {
      return boughtItems.length === 0;
    }
  }

})();
