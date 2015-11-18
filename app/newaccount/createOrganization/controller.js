var SETTINGS = require( '../../config/SETTINGS' );

function Controller ( $scope, createOrganizationService, userService ) {

	this.createOrganizationService = createOrganizationService;
	this.IGNORE_OPTION = createOrganizationService.IGNORE_OPTION;

	this.template = SETTINGS.TEMPLATE_MAPPING.CREATE_ORGANIZATION;

	this.MAX_ITEMS = SETTINGS.CREATE_ORGANIZATION.MAX_ITEMS;

	// show/hide help
	this.domainhelp = false;

	// special organization type
	this.ORGANIZATION_TYPE_OTHER = SETTINGS.ORGANIZATION_TYPE.OTHER;

	this.organization = { website: [ { url: '', isDefault: true } ] };

	createOrganizationService.getOrganizationTypes().then( ({ data }) => {
		this.organization.type = this.IGNORE_OPTION;
		this.organizationTypeData = data;
	});

	// initialize
	this._loadContinents( SETTINGS.LOCATION.CONTINENT.NORTH_AMERICA );

	$scope.$on( 'newAccountScreenChange', ( event, { form, next } ) => {

		setTimeout(function(){$('#organizationName').focus();},1000);	

		if ( form !== 'createOrganization' ) return;

		let { name, type, typeDescribe, continent, country, stateProvince, countyRegion: county, website } = this.organization;

		if ( !this.form.$valid ) {
			this.form.showValidationMessages = true;
			return;
		}

		// get the latest location Id
		let geoNameId = county || stateProvince || country;

		type = this.organizationTypeData.find( ({ displayOrdinal }) => displayOrdinal === type ).type;
		country = this.countryData.find( ({ geoNameId }) => geoNameId === country ).name;	
		
		var state = this.stateProvinceData.find( ({ geoNameId }) => geoNameId === stateProvince );
		if (state) {
			stateProvince = state.name;
		}

		var countyValue = this.countyRegionData.find( ({ geoNameId }) => geoNameId === county );
		if (countyValue) {
			county = countyValue.name;
		}

		var userData = userService.getUserData();
		userData.user.organizations = [{ name, type, typeOther: typeDescribe, country, stateProvince, county, geoNameId, website }];
		userService.setUserData(userData);

		next();
	});

	$scope.$watch( () => this.organization.continent, ( newValue ) => this.loadCountries( newValue ));
	$scope.$watch( () => this.organization.country, ( newValue ) => this.loadStatesProvinces( newValue ));
	$scope.$watch( () => this.organization.stateProvince, ( newValue ) => this.loadCountiesRegions( newValue ));
}


Controller.prototype.addWebSiteDomain = function () {
	this.organization.website.push( { url: '', isDefault: false } );
};

Controller.prototype.removeWebSiteDomain = function ( index ) {

	// check if there's more than 1 left (we need to the last one!)
	if ( this.organization.website.length > 1 ) {
		// remove item from array
		this.organization.website.splice( index, 1 );
	// though remove the value from the input if we are the only item
	} else if ( this.organization.website.length === 1 ) {
		this.organization.website[ index ].url = '';
	}
};

Controller.prototype._loadContinents = function ( initialValue ) {
	this.createOrganizationService.getContinents().then( ({ data }) => {
		this.organization.continent = initialValue;
		this.continentData = data;
	});
};

Controller.prototype.loadCountries = function ( selectedContinent ) {
	this.createOrganizationService.getCountries( selectedContinent ).then( ({ data }) => {
		// when we load new country data, reset country pre-selection
		this.organization.country = ( selectedContinent === SETTINGS.LOCATION.CONTINENT.NORTH_AMERICA ) ? SETTINGS.LOCATION.COUNTRY.USA : this.IGNORE_OPTION;
		this.countryData = data;
	});
};

Controller.prototype.loadStatesProvinces = function ( selectedCountry ) {
	this.createOrganizationService.getStatesProvinces( selectedCountry ).then( ({ data }) => {
		// when we load new state/province data, reset state/province pre-selection
		this.organization.stateProvince = this.IGNORE_OPTION;
		this.stateProvinceData = data;
	});
};

Controller.prototype.loadCountiesRegions = function ( selectedStatesProvinces ) {
	this.createOrganizationService.getCountiesRegions( selectedStatesProvinces ).then( ({ data }) => {
		// when we load new county/region data, reset county/region pre-selection
		this.organization.countyRegion = this.IGNORE_OPTION;
		this.countyRegionData = data;
	});
};


module.exports = Controller;