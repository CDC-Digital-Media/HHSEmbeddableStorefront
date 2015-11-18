function transformMediaTypes( data ) {

	// add 'All' (doesn't exist on service call)
	data.unshift( { name: '', description: 'All Media Types' } );

	// reduce object to use minimum properties
	return data
		.map( ({ name, description }) => ({ name, description }) );
}

function transform( data ) {
	// reduce object to use minimum properties
	return data.map( ({ id, name, mediaType, thumbnailUrl, alternateImages }) => {

		var { url: altThumbnailUrl, name: altName } = alternateImages
			.find( altImg => altImg.type.toUpperCase() === 'STOREFRONTTHUMBNAIL' ) || {};

		return { id, name, mediaType, thumbnailUrl, altThumbnailUrl, altName };
	});
}


module.exports = function ( dataService ) {

	return {
		getData: function ( oParm ) {

			var params = {
				max: 12,
				pageNum: oParm.page,
				offset: (oParm.page - 1) * 12
			};
			if (oParm.group == 1) {
				params.sort = 'mediaType';
			} else {
				params.sort = oParm.sort == 'asc' ? 'dateSyndicationUpdated' : '-dateSyndicationUpdated';
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
			if (oParm.parentid !== undefined){
				params.parentid = oParm.parentid;
			}
			if (oParm.sourceid !== undefined){
				params.sourceId = oParm.sourceid;
			}

			params.fields = "id,name,mediaType,thumbnailUrl,alternateImages";

			return dataService.searchMedia(params).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		},

		getTagInfo: function (topicid){
			return dataService.getTagInfo(topicid).then( ({ data, meta }) => ({ data, meta }) );
		},

		getMediaTypes: function () {
			return dataService.getMediaTypes().then( 
				function({ data }){
					data = data.map( ({ name, description }) => ({ name, description }) );
					return { data };
				}
			);
		},

		displayLayout: 'grid'


	};
};