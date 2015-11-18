function transform( data ) {
	// reduce object to use minimum properties
	return data.map( ({ id, name, mediaType, description, url, thumbnailUrl, alternateImages }) => {

		var { url: altThumbnailUrl, name: altName } = alternateImages
			.find( altImg => altImg.type.toUpperCase() === 'STOREFRONTTHUMBNAIL' ) || {};

	return { id, name, mediaType, description, url, thumbnailUrl, altThumbnailUrl, altName };
});
}

module.exports = function ( dataService ) {

	return {
		getMediaByType: function ( mediatype , oParm) {
			var params = {
				max: 12,
				pagenum: oParm.page,
				mediatype: mediatype
			};

			return dataService.getMediaByType( params ).then( ({ data, meta }) => ({ data: data, meta }) );
		},

		getData: function ( oParm ) {

			var params = {
				max: 10,
				pagenum: oParm.page
			};
			if (oParm.group == 1) {
				params.sort = 'mediatype';
			} else {
				params.sort = oParm.sort == 'asc' ? 'datemodified' : '-datemodified';
			}
			if (oParm.topic !== undefined) {
				params.topicid = oParm.topic;
			}
			if (oParm.mediatype !== undefined) {
				params.mediatype = oParm.mediatype;
			}
			if (oParm.query !== undefined) {
				params.q = oParm.query;
			}
			if (oParm.url !== undefined){
				params.sourceUrlContains = oParm.url;
			}
			//params.fields = "id,name,mediaType,thumbnailUrl,alternateImages,description";

			return dataService.searchMedia(params).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		},

		getMediaChildren: function ( id ) {
			return dataService.getMediaChildren( id ).then( ({ data }) => ({ data: data }) );
		},

		getMediaTypes: function () {
			return dataService.getMediaTypes().then( 
				function({ data }){
					data = data.map( ({ name, description }) => ({ name, description }) );
					return { data };
				}
			);
		}
	};
};