/**
 * Created by seven on 5/2/2015.
 */
var insight = angular.module('insight');
insight.controller('AccountController', function($scope,$localStorage,User) {
    $scope.settingsList = [
        { text: "Enable news from iBorrow", checked: true }
    ];
    $scope.signIn = function(){
        User.save($scope.loginData,function(result){
            $localStorage.userToken= result;
        });
    }

    $scope.user = {};
    $scope.signUp = function(){
        User.save($scope.user,function(result){
            $localStorage.user= result.data;
        });
    }
})