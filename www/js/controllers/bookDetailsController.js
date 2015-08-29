/**
 * Created by seven on 5/1/2015.
 */
var insight = angular.module('insight');
insight.controller('BookDetailsController', function($scope,$stateParams,$localStorage,$ionicActionSheet,$ionicPopup,$ionicModal,DouBanBook) {
    $scope.rate = 3;
    $scope.max = 5;
    console.log($stateParams.id+"--the book id")
    DouBanBook.get({isbn:'7505715666'},function(result){
        $scope.details = result;
    });
    $scope.getTags = function(tags){
        var tagArray = [];
        angular.forEach(tags, function(value, key) {
            tagArray.push(value.name);
        });
        return tagArray;
    }
    $scope.showActionSheet = function() {
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            titleText: '<b>Modify your album</b>',
            buttons: [
                { text: '<i class="icon ion-share balanced"></i>Share this' },
                { text: '<i class="icon ion-arrow-move"></i>Move' }
            ],
            destructiveText: '<i class="icon ion-arrow-move"></i>Delete',
            cancelText: '<i class="icon ion-arrow-move"></i>Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                return true;
            }
        });
        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 2000);
    };

    $scope.showPopup = function() {
        $scope.data = {}
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            templateUrl:'templates/iBook/detailPopup.html',
            title: 'Enter Wi-Fi Password',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
                },
            ]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        //$timeout(function() {
        //    myPopup.close(); //close the popup after 3 seconds for some reason
        //}, 3000);
    };


    $scope.$storage = $localStorage;

    $scope.test = function(){
        $scope.$storage.counter = 100;
        $scope.$storage.user = {"name":"steven","pass":"test122333"};
    }


    $ionicModal.fromTemplateUrl('templates/iBook/detailDialog.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

})