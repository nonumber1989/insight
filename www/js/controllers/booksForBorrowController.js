/**
 * Created by seven on 8/23/2015.
 */
var insight = angular.module('insight');
insight.controller('BooksForBorrowController', function ($scope,Account) {
    Account.get(function(account){
        $scope.account = account;
    })
})