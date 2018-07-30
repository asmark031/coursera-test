(function () {
    'use strict'
    angular.module('data')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'src/menudata/home.html'
                // controller :  'menudataController as ctrl'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menudata/categories.html',
                controller: 'menudataController as ctrl',
                resolve: {
                    categoryList: ['MenuDataService', function (MenuDataService) {
                        var request = MenuDataService.getAllCategories().then(function (response) {
                            return response.data;
                        });
                        return request;
                    }]
                }
            })
            .state('items', {
                url: '/items/{itemId}',
                templateUrl: 'src/menudata/items.html',
                controller: 'menudataitemsController as ctrll',
                resolve: {
                    itemsCategory: ['$stateParams','MenuDataService', function ($stateParams,MenuDataService) {
                        var request = MenuDataService.getItemsForCategory($stateParams.itemId).then(function (response) {
                            return response.data.menu_items;
                        });
                        return request;
                    }]
                }
            });
    }
})();