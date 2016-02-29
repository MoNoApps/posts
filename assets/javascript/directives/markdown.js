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

  function markdown () {
    return {
      restrict: 'E',
      templateUrl: '/templates/markdown',
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
