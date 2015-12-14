/**
 * Created by seven on 5/1/2015.
 */
var insight = angular.module('insight');
insight.controller('BooksController', function($scope,$timeout,Books,Article) {
    $scope.layout = "list";
    Books.query(function(result){
        $scope.notes = result;
    });
    Article.get(function(result){
        alert("https://128.199.91.142:3000/articles/55cef0949d9179700985c90d");
        $scope.article = result.data;
    });
    var temp =     {
        "kind": "notes#node",
        "id": "1437826259079.1133097714",
        "serverId": "1lEl2rDy1oMlkcJ6klYvzZSU22M9XsnqX-WDsX-lDpiQwYt9qM22IMeBRbiBVJeY",
        "parentId": "root",
        "type": "LIST",
        "timestamps": {
            "kind": "notes#timestamps",
            "created": "2015-07-25T12:10:59.080Z",
            "updated": "2015-07-25T12:11:55.750Z",
            "deleted": "1970-01-01T00:00:00.000Z",
            "trashed": "1970-01-01T00:00:00.000Z",
            "userEdited": "2015-07-25T12:11:55.750Z"
        },
        "title": "我是测试",
        "text": "",
        "blob": {
            "kind": "notes#blob"
        },
        "baseVersion": "12",
        "nodeSettings": {
            "newListItemPlacement": "BOTTOM",
            "checkedListItemsPolicy": "GRAVEYARD",
            "graveyardState": "EXPANDED"
        },
        "isArchived": false,
        "sortValue": "23068672"
    };
    $scope.loadMore = function() {
        console.log('Loading more!');
        $timeout(function() {
            $scope.notes.push(temp);
            temp.id = temp.id -100;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.resize');
            $scope.$broadcast('scroll.resize')
        }, 1000);
    };

    $scope.moreDataCanBeLoaded = function(){
        return true;
    };
})