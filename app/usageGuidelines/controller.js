function Controller ( $location, $rootScope, $routeParams, userService, usageGuidelinesService, temp_app ) {

	// TEMP: show angular view
	temp_app.angular_preProcessForAngularView();

	this._origin = userService.TEMP__ORIGIN__USAGE_GUIDELINES;
	this.$location = $location;
	this.$rootScope = $rootScope;
	this.$routeParams = $routeParams;
	this.userService = userService;
	this.usageGuidelinesService = usageGuidelinesService;

	// display only if we have an origin path
	if(!this.$routeParams.infoOnly){
		this.infoOnly = false;
	}else{
		this.infoOnly = true;
	}

}

Controller.prototype.agree = function () {
	this.usageGuidelinesService.agreeToUsageGuidelines( this.userService.getUserData().user.id ).then( ({ data, meta }) => {	
	
		this.userService.setUserData(data);
		this.$rootScope.syndList = this.userService.getDefaultSyndicationList();

		this.$rootScope.$broadcast('loggedIn');
		if(this.$rootScope.requestPageUrl){
			this.$location.path( "/results/url/" + this.$rootScope.requestPageUrl);
		}
		else{
			this.$location.path( "/learnmore");
		}
		
	});
};

module.exports = Controller;