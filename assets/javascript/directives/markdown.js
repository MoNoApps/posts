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
'<div>' + 
  '<a href="/posts/{{item._id}}">' +
    '<h2 class="post-title">{{item.title}}</h2>' +
  '</a>' +
  '<h3 class="post-subtitle">{{item.subtitle}}</h3>' +
  '<p class="post-info">Posted by <a href="{{item.profile}}">{{item.author}}</a> on {{item.date}}</p>' +
  '<div class="post-content"></div>' +
'</div>';

  function markdown () {
    return {
      restrict: 'E',
      template: template,
      link: link
    }; 

    function link (scope, element) {

      function does (ele) {
        var container = ele.find('.post-content')[0];
        ReactDOM.render(React.createElement(Markdown.editor, {post: scope.item.summary || ''}), container);
      }

      does(element);
    }
  } 

})(window.angular.module('coreApp'));
