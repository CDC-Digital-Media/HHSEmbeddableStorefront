function transform( data ) {

	var organizations = [],
		organizationsMapping = {};

	data.forEach(function(org){

		try {

			var name = org.name;
			if ( org.city ) 
			{name += ' ' + org.city;}
			if ( org.stateProvince ) 
			{name += ' ' + org.stateProvince;}
		
			var url;
			if(org.website && org.website.length==1){
				url = org.website[0].url;
			}
			else{
				var defaultWebsite = org.website.find(function(item){
					return item.isDefault === true;
				});
				if(defaultWebsite){
					url = defaultWebsite.url;
				}
				else{
					url = org.website[0].url;
				}
			}

			if(url) 
			{name += ' &nbsp; ' + url;}

			organizationsMapping[ name ] = org.id;
			organizations.push( name );

		} catch (e) {}

	});

	return { organizations, organizationsMapping };
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


function transform_letter( data, letter ) {

	if (letter === '0-9') {
		// filter by number
		data = data.filter( value => isNumeric(value.name.charAt( 0 )) );
	} else {
		// filter by letter
		data = data.filter( value => value.name.charAt( 0 ).toLowerCase() === letter.toLowerCase() );
	}

	return data
		// reduce object to use minimum properties
		.filter( value => value.website && value.website.length > 0 )
		//.map( ({ id, name, city, stateProvince }) => ({ id, name, cityStateProvince: `${city}, ${stateProvince}` }) )
		.sort( ( a, b ) => a.name.localeCompare( b.name ) );
}

function initLoad_transform_letter(data) {
	//console.log('init loaded');
	//debugger;
	var abortLoop = false;

	A_TO_Z.forEach(function(element, index, array) {

		if (abortLoop) {
    
			if (element === '0-9') {
				// filter by number
				data = data.filter( value => isNumeric(value.name.charAt( 0 )) );

				// if we have data, break the loop
				if (data.length > 0) {
					abortLoop = true;
					return false;
				}
			} else {
				// continue loop over next letter (element) in A_TO_Z array
				data = data.filter( value => value.name.charAt( 0 ).toLowerCase() === element.toLowerCase() );

				// if we have data, break the loop
				if (data.length > 0) {
					abortLoop = true;
					return false;
				}
			}

		} // abortLoop
	});

	return data
		// reduce object to use minimum properties
		.filter( value => value.website && value.website.length > 0 )
		//.map( ({ id, name, city, stateProvince }) => ({ id, name, cityStateProvince: `${city}, ${stateProvince}` }) )
		.sort( ( a, b ) => a.name.localeCompare( b.name ) );
}

var A_TO_Z = [
	'0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
	'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

module.exports = function ( dataService ) {

	return {

		getAtoZ: function () {
			return A_TO_Z;
		},

		getOrganization: function ( id ) {
			return dataService.getOrganization( id ).then( ({ data, meta }) => ({ data: data[ 0 ], meta }) );
		},

		getOrganizations: function () {
			return dataService.getOrganizations().then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		},

		getOrganizationsByLetter: function ( letter ) {
			return dataService.getOrganizations().then( ({ data, meta }) => ({ data: transform_letter( data, letter ), meta }) );
		},

		initLoadOrganizationsByLetter: function () {
			return dataService.getOrganizations().then( ({ data, meta }) => ({ data: initLoad_transform_letter( data ), meta }) );
		}
	};
};