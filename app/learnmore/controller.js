function Controller( $scope, $location, $anchorScroll ) {

	var self = this;

	self.$scope = $scope;
	self.$anchorScroll = $anchorScroll;

	$scope.scrollTo = function (id) {
		$location.hash(id);
		$anchorScroll();
	};

}

module.exports = Controller;