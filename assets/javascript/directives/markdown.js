(function (app, db) {

  app.controller('PostsCtrl', ['$scope', '$http', controller]);
  app.directive('markdown', [markdown]);

  function controller($scope, $http) {
    $scope.items = [];
    $scope.token = db.getItem('token');
    $http.get('/api/posts/posts')
      .then(processPosts)
      .catch(console.log);

    function processPosts(res) {
      $scope.items = res.data;
    }
  }

  function markdown() {
    return {
      restrict: 'E',
      templateUrl: '/templates/markdown',
      link: link
    };

    function link(scope, element) {

      function render(ele) {
        ReactDOM.render(
          React.createElement(Markdown.editor,
            { post: scope.item.summary || '' }),
          ele.find('.post-summary')[0]
        );

        ReactDOM.render(
          React.createElement(Markdown.editor,
            { post: scope.item.content || '' }),
          ele.find('.post-content')[0]
        );
      }

      render(element);
    }
  }

})(window.angular.module('coreApp'), window.localStorage);
