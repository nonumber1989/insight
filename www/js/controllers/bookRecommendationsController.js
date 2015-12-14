/**
 * Created by seven on 7/25/2015.
 */
var insight = angular.module('insight');
insight.controller('BookRecommendationsController', function($scope,BookRecommendations) {
    BookRecommendations.query(function(result){
        $scope.recommendations = result;
    })
    $scope.getTags = function(tags){
        var tagArray = [];
        angular.forEach(tags, function(value, key) {
            tagArray.push(value.name);
        });
        return tagArray;
    }
});