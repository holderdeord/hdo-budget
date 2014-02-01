var angular = require('angular');
var d3 = require('d3');
var numeral = require('numeral');

angular.module('budgetApp', [])
  .directive('hdoToggle', function () {
    return {
      scope: {
        entity: '=',
        key: '@'
      },
      link: function (scope, element) {
        element.addClass('toggler');
        element.on('click', function () {
          scope.$apply(function () {
            scope.entity[scope.key + 'Loaded'] = scope.entity[scope.key];
            element.parent().children().toggleClass('toggled');
          });
        });
      }
    }
  })
  .factory('budget', [function () {
    return require('./budgetFactory');
  }])
  .service('d3', function () {
    return d3;
  })
  .service('budgetLoader', [function () {
    return require('./budgetLoader');
  }])
  .controller('BudgetController', ['$scope', 'budgetLoader', 'd3', '$q', function ($scope, budgetLoader, d3, $q) {
    function prepareAlternatives(budgets, selected) {
      return budgets.filter(function (b) {
        return b !== selected;
      });
    }
    d3.json('/data/budgets.json', function (budgets) {
      $scope.budgets = budgets;
      $scope.selectedBudget = budgets[0];
      $scope.alternatives = prepareAlternatives(budgets, $scope.selectedBudget);
      budgetLoader.$new($q, budgets[0]).then(function (budget) {
        $scope.budget = budget;
      });
    });
    $scope.d = function (entity, alternative) {
      if (!entity) return 0;
      if (!alternative) return entity.revenue - entity.cost;
      return alternative.revenue + entity.cost - alternative.cost - entity.revenue;
    };
    $scope.dc = function (entity, alternative) {
      if (!$scope.selectedAlternative) return 0;
      return alternative.cost - entity.cost;
    };
    $scope.dr = function (entity, alternative) {
      if (!$scope.selectedAlternative) return 0;
      return alternative.revenue - entity.revenue;
    };
    $scope.m = function (value) {
      if (value == 0) return '';
      return numeral(value).format('0,0');
    };
    $scope.selectAlternative = function (alternative) {
      $scope.selectedAlternative = alternative;
      budgetLoader.alternative($q, $scope.budget, alternative).then(function (newBudget) {
        $scope.budget = newBudget;
      });
    };
    $scope.selectBudget = function (budget) {
      $scope.selectedBudget = budget;
      $scope.alternatives = prepareAlternatives($scope.budgets, budget);
      $scope.budget = null;
      $scope.alternative = null;
      $scope.selectedAlternative = null;
      budgetLoader.$new($q, budget).then(function (newBudget) {
        $scope.budget = newBudget;
      });
    };
  }]);