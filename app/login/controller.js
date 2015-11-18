function Controller ( $routeParams, $location, $scope, $rootScope, loginService, userService, temp_app ) {
	
	this.temp_app = temp_app;
	this.$location = $location;
	this.$scope = $scope;
	this.$rootScope = $rootScope;

	// Check for 2.6 migration param (used for ngShow content)
	this.migration = $routeParams.migration;

	// Setting scope variable for PW reset success message
	this.pwreset = $routeParams.prt;

	this.addingMedia = ($rootScope.requestPageUrl || $rootScope.requestPageMediaId) ? true : false;

	this.loginService = loginService;
	this.userService = userService;

	this.login = { userEmail: '', userPassword: '' };

	// TEMP: show angular view
	temp_app.angular_preProcessForAngularView();

	// TEMP:
	temp_app.removeAllListeners( 'logout' );

	temp_app.on( 'logout', function() {
		// this is redundant because we've got both angular and non angular pieces.
		$scope.$apply( function() {
			userService.deleteUserData();
		});
		userService.deleteUserData();
	});

	// check if logged in or if user comes from usage guidelines		
	if (this.userService.getUserData() && this.userService.getUserData().user.agreedToUsageGuidelines ) {
		this.$location.path( "/syndicationlist");
	}

	$("#userEmail").focus();
}


Controller.prototype.signIn = function () {
	this.userService.deleteUserData();

	this.form.$setValidity( 'serverError', true );

	if ( !this.form.$valid ) return;

	this.pending = true;

	this.loginService.login( this.user ).then( ({ data, meta }) => {

		this.pending = false;

	// TEMP
	if ( meta.status !== 200 ) {
		this.pwreset = null;
		this.form.$setValidity( 'serverError', false );
		// TEMP ----> ugly --->
		this.errorMessage = meta.message[ 0 ].userMessage;
		return;
	}
	
	this.userService.setUserData(data);
	this.$rootScope.syndList = this.userService.getDefaultSyndicationList();

	if ( data.user.organizations.length === 0 ) {
		this.$location.path( '/newaccount' ).search({ migration: true });
		// logged-in user has not agreed to the usage guidelines
	} else  if ( !data.user.agreedToUsageGuidelines ) {

		this.userService.TEMP__ORIGIN__USAGE_GUIDELINES = '/login';
		this.$location.path( '/usageguidelines' );

	} else {
		this.$rootScope.$broadcast('loggedIn');

		if(this.$rootScope.requestPageUrl){
			this.$location.path( "/results/url/" + this.$rootScope.requestPageUrl);
		}
		else{
			this.$location.path( "/syndicationlist");
		}
	}

});
};

module.exports = Controller;