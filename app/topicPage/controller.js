function Controller ( topicPageService, $scope, $location, $routeParams, temp_app ) {

	// TEMP: show angular view
	temp_app.angular_preProcessForAngularView();

	this.$scope = $scope;
	this.$location = $location;
	this.$routeParams = $routeParams;
	this.temp_app = temp_app;

	topicPageService.get( $routeParams.topicId ).then( ({ data, name }) => {
		this.data = data;
		this.name = name;
	});
}

// TEMP
Controller.prototype.click = function ( { id, name }, $event ) {
	
	$event.preventDefault();
	var url = '/results/page/1/sort/desc/group/0';

	if (this.$routeParams.mediatype) {
		url += '/mediatype/' + this.$routeParams.mediatype;
	}

	url += '/topic/' + id;
	//this.$scope.$apply(this.$location.path(url));
	this.$location.path(url);
};


module.exports = Controller;