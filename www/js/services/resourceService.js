/**
 * Created by seven on 4/25/2015.
 */

var insight = angular.module('insight');

insight
    .factory("BookRecommendations", function($resource) {
        return $resource('dataset/bookRecommendations.json');
    })
    .factory("Book", function($resource) {
        return $resource('dataset/book.json');
    })
    .factory("Books", function($resource) {
        return $resource('dataset/books.json');
    })
    .factory("Tags", function($resource) {
        return $resource('dataset/tags.json');
    })
    .factory("Article", function($resource) {
        return $resource('https://128.199.91.142:3000/articles/55cef0949d9179700985c90d');
    })
    .factory("User", function($resource) {
        return $resource('https://128.199.91.142:3000/user/login');
    })
    .factory("Language", function($resource) {
        return $resource('dataset/languages/languages.json');
    })
    .factory("Account", function($resource) {
        return $resource('dataset/account.json');
    })
    .factory('Camera', ['$q', function($q) {

        return {
            getPicture: function(options) {
                var q = $q.defer();

                navigator.camera.getPicture(function(result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function(err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }])

/**
 * A simple example service that returns some data.
 */
    .factory('Friends', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var friends = [
            { id: 0, name: 'Scruff McGruff' },
            { id: 1, name: 'G.I. Joe' },
            { id: 2, name: 'Miss Frizzle' },
            { id: 3, name: 'Ash Ketchum' }
        ];

        return {
            all: function() {
                return friends;
            },
            get: function(friendId) {
                // Simple index lookup
                return friends[friendId];
            }
        }
    });