'use strict';

require('./ecard' );

var utils = require( './utils' ),
	CONFIG_SERVER = require( './CONFIG' ).SERVER,
	dataServices = require( './dataServices' );

exports.init = function() {

	var mediaId = utils.browser.getQueryParams().mediaid;

	// temp fix: check if id is applied (at least we don't get an exception)
	if ( !mediaId ) return;

	dataServices.getMediaSyndicate( mediaId, null, function( err, data ) {

		$( document ).ready( function () {

			var mediaType = data.mediaType,
				content = data.content,
				description = data.description,
				targetUrl = data.targetUrl,
				sourceUrl = data.sourceUrl,
				name = data.name;

			// setup thumbnail root
			var thumbUrl = CONFIG_SERVER.API_ROOT + '/api/v2/resources/media/' + mediaId + '/thumbnail' +
				'?apiroot=' + encodeURIComponent(CONFIG_SERVER.API_ROOT) +
				'&webroot=' + encodeURIComponent(fullyQualifiedApplicationPath);

			// complete thumbnail string and get content block;
			switch ( mediaType.toUpperCase() ) {
				case 'HTML':
					thumbUrl += '&w=200&h=200&bw=700&bh=700&pause=250';
					description = stripTagsCharArray(content);
					break;

				case 'ECARD':
					thumbUrl += '&w=200&h=200&bw=580&bh=580&cx=50&cy=76&cw=472&ch=260&pause=2000';
					//content += '<div class="CDCeCard_00"></div><script> $(\'.CDCeCard_00\').ecardPlugin({';
					//content += 'mediaId: ' + mediaId + ',';
					//content += 'apiRoot: \'' + CONFIG_SERVER.API_ROOT + '\', filePath: \'' + webRoot + '/mediaAssets/ecards/cards/', returnNavigation: { text: 'Choose another eCard', navigateUrl: '' }, completeNavigation: { text: 'Choose another eCard', navigateUrl: \'\' } });</script>';

					var containerContent = $( '<div></div>' );

						// .addClass( 'CDCeCard_00' )  // is that needed?
						containerContent.ecardPlugin({
							mediaId: mediaId,
							apiRoot: CONFIG_SERVER.API_ROOT,
							filePath: CONFIG_SERVER.WEB_ROOT + '/mediaAssets/ecards/cards/',
							returnNavigation: {
								text: 'Choose another eCard',
								navigateUrl: ''
							},
							completeNavigation: {
								text: 'Choose another eCard',
								navigateUrl: ''
							}
						});

					$( '#shareContainer' ).append( containerContent );

					break;

				case 'VIDEO':
					thumbUrl += '&w=200&h=200&bw=320&bh=185&pause=2000';
					targetUrl = targetUrl.Replace('http://www.youtube.com/embed/', 'http://youtube.googleapis.com/v/');
					targetUrl = targetUrl.Replace('http://www.youtube.com/watch?v=', 'http://youtube.googleapis.com/v/');
					content += '<iframe width="420" height="315" src="' + targetUrl + '" frameborder="0" allowfullscreen></iframe>';
					break;

				case 'IMAGE':
					thumbUrl += '&w=200&h=200&bw=800&bh=800&pause=3000';
					content += '<img src="' + sourceUrl + '">';
					break;

				case 'BUTTON':
					thumbUrl += '&w=200&h=200&bw=250&bh=250&pause=1000';
					break;

				case 'BADGE':
					thumbUrl += '&w=200&h=200&bw=180&bh=150&pause=1000';
					break;

				case 'INFOGRAPHIC':
					thumbUrl += '&w=200&h=200&bw=1200&bh=1200&pause=1000';
					content += '<img src="' + data.sourceUrl + '">';
					break;

				case 'WIDGET':
					thumbUrl += '&w=200&h=200&bw=622&bh=472&pause=1000';
					break;
			}

			//var metaUrl = '<meta property="og:url" content="' + HttpContext.Current.Request.Url.AbsoluteUri + '" />',
			//	metaTitle = '<meta property="og:title" content="' + name + '" />',
			//	metaDescription = '<meta property="og:description" content="' + ( description.length > 1000 ? description.subStr(0, 1000) : description ) + '" />',
			//	metaImage = '<meta property="og:image" content="' + thumbUrl + '" />';

			// metaLiteral.Text = metaUrl + metaTitle + metaDescription + metaImage;

			//Page.Title = name;
			//lit.Text = content;
			//img.ImageUrl = thumbUrl;

			//hlBackLink.NavigateUrl = FullyQualifiedApplicationPath + "index.htm?mediaId=" + mediaId;
			//hlBackLink.Text = FullyQualifiedApplicationPath;

			var appPath = fullyQualifiedApplicationPath();

			$( '#hlBackLink' )
				.attr( 'href', appPath + 'index.htm?mediaId=' + mediaId )
				.html( appPath );
		});
	});
};

function stripTagsCharArray(source) {

	var array = [],
		arrayIndex = 0,
		inside = false;

	for (var i = 0; i < source.Length; i++) {
		var s = source[i];
		if (s === '<') {
			inside = true;
			continue;
		}
		if (s === '>') {
			inside = false;
			continue;
		}
		if (!inside) {
			array[arrayIndex] = s;
			arrayIndex++;
		}
	}

	//return new String(array, 0, arrayIndex);
	return '';
}

function fullyQualifiedApplicationPath() {

	//temp for build
	var HttpContext,
	// Return variable declaration
		appPath = '',
	// Getting the current context of HTTP request
		context = HttpContext.Current;

	//Checking the current context content
	if (!context) {
		//Formatting the fully qualified website url/name
		appPath = String.Format('{0}://{1}{2}{3}',
								context.Request.Url.Scheme,
								context.Request.Url.Host,
								context.Request.Url.Port === 80 ? '' : ':' + context.Request.Url.Port,
								context.Request.ApplicationPath);
	}

	if (!appPath.EndsWith('/')) appPath += '/';

	return appPath;
}