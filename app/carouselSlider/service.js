function transform( data ) {

	// reduce object to use minimum properties
	return data[ 0 ].children.map( ({ id, name, thumbnailUrl, alternateImages }) => {

		var { url: altThumbnailUrl, name: altName } = alternateImages
			.find( altImg => altImg.name.toUpperCase() === 'MEDIAFEATURETHUMBNAIL' || altImg.type.toUpperCase() === 'MEDIAFEATURETHUMBNAIL' || altImg.name.toUpperCase() === 'MEDIAFEATUREDTHUMBNAIL' || altImg.type.toUpperCase() === 'MEDIAFEATUREDTHUMBNAIL') || {};

		return { id, name, thumbnailUrl, altThumbnailUrl, altName };
	});
}

module.exports = function ( $q, dataService ) {

	return {
		get: function ( collectionId ) {
			return dataService.getMediaChildren( collectionId ).then( ({ data, meta }) => ({ data: transform( data ), meta }) );
		}
	};
};