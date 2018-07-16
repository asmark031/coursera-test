(
    function () {
        'use strict';

        angular.module('ShoppingListCheckOff', [])
            .controller('ToBuyController', ToBuyController)
            .controller('AlreadyBoughtController', AlreadyBoughtController)
            .controller('testingFilter', testingFilter)
            .controller('testingScope',testingScope)
            .filter('custom', customFilterFactory)
            .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

        function testingScope(){
            this.value = "hello from tesingScope";
        }

        //filter function 
        testingFilter.$inject = ['$scope','customFilter']
        function testingFilter($scope,customFilter){
            $scope.hello = customFilter("hello");
        }

        var searchString = "";
        function customFilterFactory(){
            return function(input){
                return input.indexOf(searchString) == -1;
            }
        }

        ToBuyController.$inject = ['ShoppingListCheckOffService'];
        function ToBuyController(ShoppingListCheckOffService) {
            var itemAdder = this;
            console.log(this);
            itemAdder.Items = [{ Name: "cookies", Quantity: 2 }, { Name: "Biscuits", Quantity: 10 }, { Name: "Maggie", Quantity: 4 }, { Name: "Cake", Quantity: 1 }, { Name: "Water bottles", Quantity: 2 }]
            angular.forEach(itemAdder.Items, function (value, key) {
                // console.log(key + ': ' + value);
                ShoppingListCheckOffService.addItems(value.Name, value.Quantity);
            });
            itemAdder.bought = function (itemIndex, Name, Quantity) {
                ShoppingListCheckOffService.boughT(itemIndex, Name, Quantity);
            };
            itemAdder.items = ShoppingListCheckOffService.toBuyDisplay();
            itemAdder.check = itemAdder.items;
        };

        AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
        function AlreadyBoughtController(ShoppingListCheckOffService) {
            var boughtItems = this;
            boughtItems.items = ShoppingListCheckOffService.boughtDisplay();
        };

        function ShoppingListCheckOffService() {
            var service = this;
            var toBuy = [];
            var bought = [];
            //adding items
            service.addItems = function (itemName, itemQuantity) {
                var item = {
                    Name: itemName,
                    Quantity: itemQuantity
                }
                toBuy.push(item);
            }
            //deleting and re-assigning
            service.boughT = function (itemIndex, itemName, itemQuantity) {
                toBuy.splice(itemIndex, 1);
                var item = {
                    Name: itemName,
                    Quantity: itemQuantity
                }
                bought.push(item);
            }
            //showing 
            service.toBuyDisplay = function () {
                return toBuy;
            }
            service.boughtDisplay = function () {
                return bought;
            }
        };
    })()