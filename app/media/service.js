

module.exports = function ( dataService ) {

	return {

		getMediaItem: function( mediaId ){

			return dataService.getMediaItem(mediaId).then( ({ data, meta }) => ({ data , meta }) );
		},

    getMediaItemEmbedCode: function( mediaId ){

      return dataService.getMediaItemEmbedCode(mediaId).then( ({ data, meta }) => ({ data, meta }) );
    }

	};
};