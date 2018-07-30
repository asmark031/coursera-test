(function () {
    'use strict'
    angular.module('data', ['ui.router'])
        .controller('menudataController', menudataController)
        .controller('menudataitemsController', menudataitemsController)
        .service('MenuDataService', MenuDataService)
        .component('categories', {
            templateUrl: 'src/menudata/categoriesTemplate.html',
            bindings: {
                items: '<'
            }
        })
        .component('items', {
            templateUrl: 'src/menudata/itemsTemplate.html',
            bindings: {
                items: '<'
            }
        });


    menudataitemsController.$inject = ['itemsCategory'];
    function menudataitemsController(itemsCategory) {
        var menudata = this;
        menudata.itemsList = itemsCategory;
        console.log(itemsCategory);
    }
    // menudataController.$inject = ['itemsCategory','categoryList'];
    // function menudataController(itemsCategory,categoryList) {
    menudataController.$inject = ['categoryList'];
    function menudataController(categoryList) {
        var menudata = this;
        menudata.categoryItems = categoryList;
        // menudata.itemCategory = itemsCategory;
    };

    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        var service = this;

        service.getAllCategories = function () {
            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/categories.json")
            });
            return response;
        };

        service.getItemsForCategory = function (shortname) {
            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
                params: {
                    category: shortname
                }
            });
            return response;
        };
    };
})();