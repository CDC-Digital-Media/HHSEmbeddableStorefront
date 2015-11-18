var TEMPLATE_MAPPING = require( '../../config/SETTINGS' ).TEMPLATE_MAPPING;

function Controller ( $scope, existingOrganizationService, userService ) {

	this.template = TEMPLATE_MAPPING.EXISTING_ORGANIZATION;
	this.existingOrganizationService = existingOrganizationService;
	this.userService = userService;

	// todo: parameter is temp
	this.existingOrganizationService.initLoadOrganizationsByLetter().then( ({ data }) => {
		this.organizationDataLetter = data;
	});

	this.atozata = existingOrganizationService.getAtoZ();

	$scope.$on( 'newAccountScreenChange', ( event, { form, next } ) => {

		setTimeout(function(){$('#existingOrganizationName').focus();},1000);	

		if ( form !== 'existingOrganization' ) return;	

		// reset
		this.form.$setValidity( 'organizationRequired', true );

		// additional validation
		if ( !this.organizationData || !this.organizationData.name ) {
			this.form.$setValidity( 'organizationRequired', false );
		}

		if ( !this.form.$valid ) {
			this.form.showValidationMessages = true;
			return;
		}

		next();
	});
}

Controller.prototype.openOrganizations = function () {
	$( '#atozModal' ).modal({ show: true, keyboard: true });
};

Controller.prototype.selectLetter = function ( letter, $event ) {

	$event.preventDefault();

	this.existingOrganizationService.getOrganizationsByLetter( letter ).then( ({ data }) => {
		this.organizationDataLetter = data;

		this.orgsNotFound = (data.length < 1) ? true : false;
	});	
};

Controller.prototype.selectOrganization = function ( id, $event ) {

	$event.preventDefault();

	//todo: fix!!!!! not the right way!
	$( '.modal-registration .close' ).trigger( 'click' );

	var userData = this.userService.getUserData();
	userData.user.organizations = [{ id }];
	this.userService.setUserData(userData);

	this.existingOrganizationService.getOrganization( id ).then( ({ data }) => {
		this.organizationData = data;
	});

	// clear textbox
	$('#existingOrganizationName').val('');

	this.form.$setValidity( 'organizationRequired', true );

};

// set up type ahead from bootstrap
// http://getbootstrap.com/2.3.2/javascript.html#typeahead
// jQuery temp!!!
Controller.prototype.loadTypeAheadOrganizations = function () {

	this.existingOrganizationService.getOrganizations().then( ({ data }) => {

		$( '#existingOrganizationName' ).typeahead({
			source: data.organizations,
			items: 10,
			updater: organization => {

				if ( !organization ) return;				
				var id = data.organizationsMapping[ organization ];

				var userData = this.userService.getUserData();
				userData.user.organizations = [{ id }];
				this.userService.setUserData(userData);

				this.existingOrganizationService.getOrganization( id ).then( ({ data }) => {
					this.organizationData = data;
				});

				this.form.$setValidity( 'organizationRequired', true );
			}
		});
	});
};

module.exports = Controller;
