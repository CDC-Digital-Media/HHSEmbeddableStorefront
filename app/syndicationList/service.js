function transform( data ) {
	// reduce object to use minimum properties
	return data.map( ({ id, name, mediaType, thumbnailUrl, alternateImages, datePublished, description }) => {

		var { url: altThumbnailUrl, name: altName } = alternateImages
			.find( altImg => altImg.type.toUpperCase() === 'STOREFRONTTHUMBNAIL' ) || {};

	return { id, name, mediaType, thumbnailUrl, altThumbnailUrl, altName, datePublished, description };
	});
}

module.exports = function ( dataService ) {

	return {

		getSyndicationList: function( id, pg, max ){
			if(!max){max = 10;}			
			return dataService.getAccountMedia({ syndicationlistid: id, sort: '-SyndicationListModifiedDateTime', pagenum: pg, max: max }).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		},
		addMediaToSyndicationList: function( id, listGuid, userEmail ){	
			var data = {
				media: [{ mediaId: id }],
				lastUpdatedUserEmailAddress: userEmail
			};
			return dataService.addMediaToSyndicationList(data, listGuid)
				.then( ({ data, meta }) => ({ data, meta }) );								
		},
		removeMediaFromSyndicationList: function( id, listGuid, userEmail ){
			var data = {
				media: [{ mediaId: id }],
				lastUpdatedUserEmailAddress: userEmail
			};
			return dataService.removeMediaFromSyndicationList(data, listGuid)
				.then( ({ data, meta }) => ({ data, meta }) );						
		}
	};
};