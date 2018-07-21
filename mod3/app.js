(
    function () {
        'use strict';

        angular.module('NarrowItDownApp', [])
            .controller('NarrowItDownController', NarrowItDownController)
            .service('MenuSearchService', MenuSearchService)
            .directive('foundItems', foundItems);

        function foundItems() {
            var ddo = {
                templateUrl: 'directive.html',
                scope: {
                    foundList: '<',
                    onRemove: '&'
                }
            };
            return ddo;
        }

        NarrowItDownController.$inject = ['MenuSearchService']
        function NarrowItDownController(MenuSearchService) {
            var narrow = this;
            narrow.items = [];
            narrow.search = function (value) {
                narrow.bought = [];
                console.log(value);
                if (value == undefined || value == '') {
                    narrow.showError = true;
                    return;
                }
                else {
                    narrow.showError = false;
                }
                console.log(narrow.showError);
                var promise = MenuSearchService.getMenuCategories();
                promise
                    .then(function (response) {
                        // angular.forEach(response.data.menu_items, function (oneItem) {
                        //     narrow.items.push(oneItem);
                        //     if (oneItem.description.indexOf(value) !== -1) {
                        //         narrow.bought.push(oneItem)
                        //     };
                        // });
                        narrow.bought = response.data.menu_items.filter(function (item) {
                            return (item.description.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                        });
                        if (narrow.bought == "") {
                            console.log("from the main loop" + narrow.bought);
                            narrow.showError = true;
                            return;
                        }
                        console.log(narrow.bought);
                    })
                    .catch(function (error) {
                        console.log("Something went terribly wrong.");
                    });
            };
            narrow.removeItem = function (ItemIndex) {
                narrow.bought.splice(ItemIndex, 1);
            }
        }

        MenuSearchService.$inject = ['$http'];
        function MenuSearchService($http) {
            var service = this;

            service.getMenuCategories = function () {
                var response = $http({
                    method: "GET",
                    url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
                });
                return response;
            };
        }
    }
)();

