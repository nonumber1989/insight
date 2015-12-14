/**
 * Created by seven on 8/16/2015.
 */
/**
 * Created by seven on 7/25/2015.
 */
var insight = angular.module('insight');
insight.controller('MasonryController', function($scope) {

    function genBrick() {
        var height = ~~(Math.random() * 500) + 100;
        var id = ~~(Math.random() * 10000);
        return {
            src: 'http://lorempixel.com/g/280/' + height + '/?' + id
        };
    };

    $scope.bricks = [
        genBrick(),
        genBrick(),
        genBrick(),
        genBrick(),
        genBrick()
    ];

    $scope.add = function add() {
        $scope.bricks.push(genBrick());
    };

    $scope.remove = function remove() {
        $scope.bricks.splice(
            ~~(Math.random() * $scope.bricks.length),
            1
        )
    };

    //$cordovaImagePicker
    //var options = {
    //    maximumImagesCount: 10,
    //    width: 800,
    //    height: 800,
    //    quality: 80
    //};

    //$cordovaImagePicker.getPictures(options)
    //    .then(function (results) {
    //        $scope.urls=results;
    //        for (var i = 0; i < results.length; i++) {
    //            console.log('Image URI: ' + results[i]);
    //        }
    //    }, function(error) {
    //        // error getting photos
    //    });
});