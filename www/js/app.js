// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'insight' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'insight.controllers' is found in controllers.js
angular.module('insight', ['ionic', 'ngCordova', 'ngResource', 'ngStorage', 'pascalprecht.translate', 'angular-jwt','ionic.rating','wu.masonry'])

    .run(function ($ionicPlatform, $rootScope, $ionicLoading, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            //local notification
            //triggered when a notification was clicked outside the app (background)
            cordova.plugins.notification.local.on('click', function (notification) {
                $rootScope.$broadcast("$cordovaLocalNotification:clicked", notification);
            });
        });

        $rootScope.$on("$cordovaLocalNotification:clicked", function (event, notification) {
            console.log("$cordovaLocalNotification clicked");
            console.log(JSON.stringify(notification));
            alert(JSON.stringify(notification));
            //Internally code do the string here so we have to convert it json object
            //various ways rather keep the string at server to make sure that we have to convert that in JSON
            //followed both the path and is good...any of it.
            var dataToPass = angular.fromJson(notification.data);
            console.log("moving to " + (dataToPass.type != "ON_MOBILE_CHANGE"));
            //$rootScope.updateNotification(notification.id);
            if (dataToPass.type != "ON_MOBILE_CHANGE") {
                // $state.go("app.disputedetails",{'id':dataToPass.id});
            }
        });
        //register listeners for loading
        $rootScope.$on('loading:show', function () {
            $ionicLoading.show();
        })
        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide();
        })
    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider, $httpProvider, jwtInterceptorProvider) {
        $httpProvider.interceptors.push(function ($rootScope,$injector) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show');
                    return config;
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide');
                    return response;
                },
                responseError: function (rejection) {
                    $rootScope.$broadcast('loading:hide');
                    console.log(JSON.stringify(rejection));
                    if (rejection.data === null) {

                    } else if (rejection.status === 401) {
                        $injector.invoke(function ($state) {
                            console.log($state.current.name);
                            $state.go('insight.signIn');
                        });
                        } else if (rejection.status === 403) {

                    } else if (rejection.status === 404) {

                    } else if (rejection.status === 500) {

                    }
                }
            }
        });

        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
        jwtInterceptorProvider.authPrefix = '';
        jwtInterceptorProvider.tokenGetter = ['config','jwtHelper','$localStorage', function (config,jwtHelper,$localStorage) {
            var theUserToken = $localStorage.userToken;
            if(theUserToken instanceof Object){
                var date = jwtHelper.getTokenExpirationDate(theUserToken.token);
                var bool = jwtHelper.isTokenExpired(theUserToken.token);
                return theUserToken.token;
            }else{
                //do nothing with rejected with 401 Unauthorized error
            }
        }];
        $httpProvider.interceptors.push('jwtInterceptor');

        $translateProvider.useStaticFilesLoader({
            prefix: 'dataset/languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('zh_CN');
        $translateProvider.fallbackLanguage('zh_EN');

        $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
        $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS

        $stateProvider
            .state('insight', {
                url: "/insight",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'InsightController'
            })

            .state('insight.books', {
                url: "/books",
                views: {
                    'menuContent': {
                        templateUrl: "templates/iBook/books.html",
                        controller: 'BooksController'
                    }
                }
            })

            .state('insight.book', {
                url: "/book/:id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/iBook/book.html",
                        controller: 'BookDetailsController'
                    }
                }
            })
            //.state('insight.bookTags', {
            //    url: "/bookTags",
            //    views: {
            //        'menuContent': {
            //            templateUrl: "templates/iBook/bookTags.html",
            //            controller: 'BooksForMeController'
            //        }
            //    }
            //})
            //.state('insight.booksForMe', {
            //    url: "/booksForMe/:status",
            //    views: {
            //        'menuContent': {
            //            templateUrl: "templates/iBook/booksForMe.html",
            //            controller: 'BooksForMeController'
            //        }
            //    }
            //})
            .state('insight.bookScanner', {
                url: "/bookScanner",
                views: {
                    'menuContent': {
                        templateUrl: "templates/scanner/bookScanner.html",
                        controller: 'BookScannerController'
                    }
                }
            })
            .state('insight.bookRecommendations', {
                url: "/bookRecommendations",
                views: {
                    'menuContent': {
                        templateUrl: "templates/iBook/bookRecommendations.html",
                        controller: 'BookRecommendationsController'
                    }
                }
            })
            .state('insight.account', {
                url: "/account",
                views: {
                    'menuContent': {
                        templateUrl: "templates/account/account.html",
                        controller: 'AccountController'
                    }
                }
            })
            .state('insight.signIn', {
                url: "/account/signIn",
                views: {
                    'menuContent': {
                        templateUrl: "templates/account/signIn.html",
                        controller: 'AccountController'
                    }
                }
            })
            .state('insight.signUp', {
                url: "/account/signUp",
                views: {
                    'menuContent': {
                        templateUrl: "templates/account/signUp.html",
                        controller: 'AccountController'
                    }
                }
            })

            //for books for me tabs
            .state('insight.booksForMe', {
                url: "/booksForMe",
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: "templates/booksForMe/tabs.html",
                        controller: 'BooksForMeController'
                    }
                }
            })
            .state('insight.booksForMe.read', {
                url: "/read",
                views: {
                    'readContent': {
                        templateUrl: "templates/booksForMe/read.html",
                        controller: 'BooksForMeController'
                    }
                }
            })
            .state('insight.booksForMe.onReading', {
                url: "/onReading",
                views: {
                    'readingContent': {
                        templateUrl: "templates/booksForMe/reading.html",
                        controller: 'BooksForMeController'
                    }
                }
            })
            .state('insight.booksForMe.wishList', {
                url: "/wishList",
                views: {
                    'wishListContent': {
                        templateUrl: "templates/booksForMe/wishList.html",
                        controller: 'BooksForMeController'
                    }
                }
            })
            .state('insight.booksForMe.favorite', {
                url: "/favorite",
                views: {
                    'favoriteContent': {
                        templateUrl: "templates/booksForMe/favorite.html",
                        controller: 'BooksForMeController'
                    }
                }
            })
            .state('insight.booksForMe.label', {
                url: "/label",
                views: {
                    'labelContent': {
                        templateUrl: "templates/booksForMe/label.html",
                        controller: 'BooksForMeController'
                    }
                }
            })

            //for books for borrow tabs
            .state('insight.booksForBorrow', {
                url: "/booksForBorrow",
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: "templates/booksForBorrow/tabs.html",
                        controller: 'BooksForBorrowController'
                    }
                }
            })
            .state('insight.booksForBorrow.borrowedFrom', {
                url: "/borrowedFrom",
                views: {
                    'borrowedFromContent': {
                        templateUrl: "templates/booksForBorrow/borrowedFrom.html",
                        controller: 'BooksForBorrowController'
                    }
                }
            })
            .state('insight.booksForBorrow.borrowedTo', {
                url: "/borrowedTo",
                views: {
                    'borrowedToContent': {
                        templateUrl: "templates/booksForBorrow/borrowedTo.html",
                        controller: 'BooksForBorrowController'
                    }
                }
            })

            .state('insight.settings', {
                url: "/account/settings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/account/settings.html",
                        controller: 'AccountController'
                    }
                }
            });
// if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/insight/bookRecommendations');
    })

    .constant('$ionicLoadingConfig', {
        template: 'Default Loading Template...'
    });