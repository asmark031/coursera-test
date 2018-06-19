(function () {
    'use strict';
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController)

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.green = {
            "color": "green"
        }
        $scope.red = {
            "color": "red"
        }
        $scope.check = function (stringToSplit) {
            var lunchMenu = stringToSplit.split(',');
            
            //cleaning the empty elements
            Array.prototype.clean = function(deleteValue) {
                for (var i = 0; i < this.length; i++) {
                  if (this[i] == deleteValue) {         
                    this.splice(i, 1);
                    i--;
                  }
                }
                return this;
            };              
            lunchMenu.clean('');
            //console.log(lunchMenu);
            $scope.message = (lunchMenu.length < 4) ? "Enjoy!" : "Too much!";
            $scope.color = (lunchMenu.length < 4) ? "green" : "red";
        }

    };
})();