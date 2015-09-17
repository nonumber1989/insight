/**
 * Created by seven on 4/25/2015.
 */

var insight = angular.module('insight');

insight.controller('InsightController', function ($scope, $ionicModal, $timeout, $localStorage, $translate, Account,Language) {
        $scope.entries = [];

    $scope.$storage = $localStorage;

    Language.query(function(result){
        $scope.languages = result;
    },function(error){

    })

    Account.get(function(account){
        $scope.account = account;
    })
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
    $scope.account = {
        language: 'zh_CN'
    };
    $scope.getLanguageText = function (value) {
        return _.result(_.find($scope.languages, function (theOne) {
            return theOne.value == value;
        }), 'text');
    }

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})
