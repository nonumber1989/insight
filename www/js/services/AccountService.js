/**
 * Created by seven on 2015/9/24.
 */
var insight = angular.module('insight');
insight.factory('AccountService', ['$localStorage', function($localStorage) {
    var account = $localStorage.user;
    return {
        getAccount : function (){
            return account;
            //JSON.parse(account);
        }
    }
}]);