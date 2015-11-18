function Controller (atozTopicListService, $scope, $location, $routeParams, temp_app ) {

	// TEMP: show angular view
	temp_app.angular_preProcessForAngularView();

	this.$scope = $scope;
	this.$location = $location;
	this.$routeParams = $routeParams;
	this.temp_app = temp_app;

	atozTopicListService.get( $routeParams.letter ).then( value => {
		this.items = value.data;
		this.letter = $routeParams.letter;
	});

	Controller.prototype.totop = function () {
		$(window).scrollTop(0);
	};
}


Controller.prototype.click = function ( id, name, $event ) {
	
	$event.preventDefault();
	var url = '/results/page/1/sort/desc/group/0';
	url += '/topic/' + id;
	//this.$scope.$apply(this.$location.path(url));
	this.$location.path(url);
};


module.exports = Controller;