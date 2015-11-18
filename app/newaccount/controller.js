var WIZARD = {
	createLogin: 1,
	createContact: 2,
	existingOrganization: 3,
	createOrganization: 4
};

function getObjectKeyByValue( obj, value ) {

	for ( let key of Object.keys( obj ) ) {
		if ( obj[ key ] === value ) return key;
	}
}


function Controller ( $routeParams, $location, $rootScope, newAccountService, userService, temp_app ) {
		
	this.newAccountService = newAccountService;
	this.temp_app = temp_app;

	// TEMP: show angular view
	temp_app.angular_preProcessForAngularView();

	this.userService = userService;
		
	if(!this.userService.getUserData()){
		var userData = {};
		userData.user = {};
		this.userService.setUserData(userData);
	}

		this.showExistingOrganization = true;

		// Check for 2.6 migration param (used for ngShow content)
		this.migration = $routeParams.migration;

		// initialize
		this.step = ( this.migration ) ? WIZARD.existingOrganization : WIZARD.createLogin;

		this.$rootScope = $rootScope;
		this.$location = $location;


		this.orgAlreadyExists = false;

}


Controller.prototype.prev = function () {
	this.step--;
};


Controller.prototype.next = function () {
	var form = getObjectKeyByValue( WIZARD, this.step );
	this.$rootScope.$broadcast( 'newAccountScreenChange', { form, next: () => this.step++ } );
};


Controller.prototype.submit = function submit() {

		var form = getObjectKeyByValue( WIZARD, this.step );

		//this.pending = true;

		this.$rootScope.$broadcast( 'newAccountScreenChange', { form, next: () => {

		this.userService.TEMP__ORIGIN__USAGE_GUIDELINES = '/login';

		if(!this.userService.getUserData().user.id){ 
			// new user
			
			this.orgAlreadyExists = false;

			this.newAccountService.registerUser( this.userService.getUserData().user ).then( ({ data, meta }) => {
				this.pending = false;
				if ( meta.status !== 200 ) {
					this.errorMessage = meta.message[ 0 ].userMessage;					
					this.orgAlreadyExists = true;
					return;
				}

				this.userService.setUserData(data);				

				this.$location.path( '/usageguidelines' ).replace();

				//this.temp_app.angular_userAccountView( this.userService.getUserData().user );

			});
		}else{
			//migrated user
			this.newAccountService.updateUser( this.userService.getUserData().user, this.userService.getUserData().user.id ).then( ({ data, meta }) => {
				this.pending = false;
				if ( meta.status !== 200 ) {
					this.form.$setValidity( 'serverError', true );				
					this.errorMessage = meta.message[ 0 ].userMessage;
					return;
				}

				this.userService.setUserData(data);	

				this.$location.path( '/usageguidelines' ).replace();

				//this.temp_app.angular_userAccountView( this.userService.getUserData().user );

		});
	}

		}});
	};

module.exports = Controller;