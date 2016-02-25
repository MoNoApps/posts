(function(app){

  app.controller('PostsCtrl', ['$scope', '$http', controller]);
  app.directive('markdown', [markdown]);

  function controller ($scope, $http) {
    $scope.items = [];
    $http.get('/api/posts')
    .then( processPosts )
    .catch( console.log );   

    function processPosts (res) {
      $scope.items = res.data;
    }
  }

  var template = 
'<div class=" post col-xs-12 col-sm-12 col-md-12 col-lg-6">' + 
  '<div">' +
    '<h2 class="post-title">{{item.title}}</h2>' +
    '<h3 class="post-subtitle">{{item.subtitle}}</h3>' +
    '<p class="post-info">Posted by <a href="{{item.profile}}">{{item.author}}</a> on {{item.date}}</p>' +
    '<div ng-show="item.more" class="post-summary"></div>' +
    '<div ng-show="item.more" class="post-content"></div>' +
    '<a ng-show="!item.more" ng-click="item.toggle()" href="" class="btn btn-primary col-md-3">' +
      '<i class="fa fa-angle-down fa-3x"></i></a>' +
    '<a ng-show="item.more" ng-click="item.toggle()" "href="" class="btn btn-primary col-md-3">' +
      '<i class="fa fa-angle-up fa-3x"></i></a>' +
    '<a href="" class="btn btn-primary col-md-3"><i class="fa fa-share-alt fa-3x"></i></a>' +
    '<a href="/posts/{{item._id}}" class="btn btn-success col-md-3"><i class="fa fa-edit fa-3x"></i></a>' +
    '<a ng-click="item.disable()" href="" class="btn btn-danger col-md-3"><i class="fa fa-trash fa-3x"></i></a>' +
  '</div>' +
'</div>';

  function markdown () {
    return {
      restrict: 'E',
      template: template,
      link: link
    }; 

    function link (scope, element) {

      scope.item.more = false;
      scope.item.toggle = toggle;

      function toggle () {
        scope.item.more = !scope.item.more;
      }

      function disable () {
        scope.item.disabled = true;
        //TODO: Ajax event
        //TODO: Reload list
      }

      function render (ele) {
        ReactDOM.render(
          React.createElement(Markdown.editor, 
          {post: scope.item.summary || ''}),
          ele.find('.post-summary')[0]
        );

        ReactDOM.render(
          React.createElement(Markdown.editor,
          {post: scope.item.content || ''}),
          ele.find('.post-content')[0]
        );
      }

      render(element);
    }
  } 

})(window.angular.module('coreApp'));
