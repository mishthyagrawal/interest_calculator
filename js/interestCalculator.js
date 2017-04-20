(function() {
    var app = angular.module('calcApp', []);
    //simple interest controller
    app.controller('SimpleInterestCalculator', function($scope) {
        $scope.principal = 0;
        $scope.rate = 0;
        $scope.months = 0;
        var tenurePeriodVal = 12; // months

        $scope.IsHidden = true;

        $scope.Calculate = function() {
            //cal total
            $scope.total = $scope.principal * (1 + ($scope.rate / 100) * $scope.months / tenurePeriodVal);
            //calc compound interest
            $scope.interest = $scope.total - $scope.principal;
            //show div
            $scope.IsHidden = false;
        }

    });

    //compound interest controller
    app.controller('CompoundInterestCalculator', function($scope) {
        $scope.principal = 0;
        $scope.rate = 0;
        $scope.months = 0;
        $scope.frequency = 0;
        var tenurePeriodVal = 12; // months

        $scope.IsHidden = true;

        $scope.Calculate = function() {
            //cal total
            $scope.total = $scope.principal * (Math.pow((1 + $scope.rate / (100 * $scope.frequency)), ($scope.months * $scope.frequency / tenurePeriodVal)));
            //calc compound interest
            $scope.interest = $scope.total - $scope.principal;
            //show div
            $scope.IsHidden = false;
        }
    });
	
	//number validation, decimal allow 2 digits
	app.directive('validNumber', function() {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
            return; 
          }

          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
                var val = '';
            }
            
            var clean = val.replace(/[^-0-9\.]/g, '');
            var negativeCheck = clean.split('-');
			var decimalCheck = clean.split('.');
            if(!angular.isUndefined(negativeCheck[1])) {
                negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                clean =negativeCheck[0] + '-' + negativeCheck[1];
                if(negativeCheck[0].length > 0) {
                	clean =negativeCheck[0];
                }
                
            }
              
            if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                clean =decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind('keypress', function(event) {
            if(event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    });

})();