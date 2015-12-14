/**
 * Created by seven on 5/2/2015.
 */

var insight = angular.module('insight');
insight.controller('CustomerServiceController', function($scope,$stateParams) {
    console.log($stateParams.status);
    alert($stateParams.status+"--------------------here is the one--------------------------");
})