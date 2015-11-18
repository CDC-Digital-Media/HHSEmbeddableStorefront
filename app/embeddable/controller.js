var CONFIG = require('../../js/CONFIG');

function Controller($rootScope, $scope, $location, $routeParams) {

  var self = this;

  self.$rootScope = $rootScope;
  self.$scope = $scope;
  self.$location = $location;
  self.$routeParams = $routeParams;
  self.embeddable = CONFIG.EMBEDDABLE;

  if (self.$routeParams.collectionId) {
    var collectionId = self.$routeParams.collectionId;
    self.$rootScope.embeddableCollectionId = collectionId;
  }

  if (self.$routeParams.title) {
    self.$rootScope.embeddableTitle = decodeURI(self.$routeParams.title);
  }

  if (self.$routeParams.theme) {
    $('html').addClass('theme-' + self.$routeParams.theme);
  }

  if (self.$routeParams.controls) {
    self.$rootScope.embeddableControls = self.$routeParams.controls;
  }

  self.$location.path( '/results' );
}


module.exports = Controller;