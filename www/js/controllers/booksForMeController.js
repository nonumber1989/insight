/**
 * Created by seven on 8/16/2015.
 */
var insight = angular.module('insight');
insight.controller('BooksForMeController', function ($scope, BookRecommendations,Account, Tags) {

    Account.get(function(account){
        $scope.account = account;
    })

    $scope.onTabSelected = function (tabName) {
        switch (tabName) {
            case "reading":
                BookRecommendations.query(function (result) {
                    $scope.books = result;
                })
                break;
            case "read":
                BookRecommendations.query(function (result) {
                    $scope.books = result;
                })
                break;
            case "wishList":
                BookRecommendations.query(function (result) {
                    $scope.books = result;
                })
                break;
            case "favorite":
                BookRecommendations.query(function (result) {
                    $scope.books = result;
                })
                break;
            case "label":
                Tags.query(function (result) {
                    $scope.labels = result;
                })
                break;
            default:
                console.log("default logging");
        }
    }

    $scope.getTags = function (tags) {
        var tagArray = [];
        angular.forEach(tags, function (value, key) {
            tagArray.push(value.name);
        });
        return tagArray;
    }

})