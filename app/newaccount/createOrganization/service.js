var IGNORE_OPTION,
	ADDITIONAL_OPTIONS = {
		ORGANIZATION_TYPE: { type: 'Choose an Organization Type', displayOrdinal: IGNORE_OPTION },
		CONTINENT: { name: 'Select a Continent', geoNameId: IGNORE_OPTION },
		COUNTRY: { name: 'Select a Country', geoNameId: IGNORE_OPTION },
		STATE_PROVINCE: { name: 'Select a State/Province', geoNameId: IGNORE_OPTION },
		COUNTY_REGION: { name: 'Select a County/Region', geoNameId: IGNORE_OPTION }
	};

function transform( data, optionType ) {
	if ( data.length > 0 ) data.unshift( ADDITIONAL_OPTIONS[ optionType ] );
	return data;
}

module.exports = function ( dataService, $q ) {

	function getLocation( id, optionType ) {

		if ( id === IGNORE_OPTION ) {
			return $q( ( resolve ) => resolve({ data: transform( [], optionType ), meta: null }) );
		}

		return dataService.getLocations( id ).then( ({ data, meta }) => ({ data: transform( data, optionType ), meta }) );
	}

	return {

		IGNORE_OPTION,

		getOrganizationTypes: function () {
			return dataService.getOrganizationTypes().then( ({ data, meta }) => ({ data: transform( data, 'ORGANIZATION_TYPE' ), meta }) );
		},

		getContinents: function () {
			return getLocation( '', 'CONTINENT' );
		},

		getCountries: function ( id ) {
			return getLocation( id, 'COUNTRY' );
		},

		getStatesProvinces: function ( id ) {
			return getLocation( id, 'STATE_PROVINCE' );
		},

		getCountiesRegions: function ( id ) {
			return getLocation( id, 'COUNTY_REGION' );
		}
	};
};