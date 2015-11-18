'use strict';

//var _ = require( 'lodash' ),
//	dataServices = require('./dataServices'),
//	appState = require( './appState' );

//function add(activeDiv, listGuid, mediaId, onCompleteHandler) {

//	var data = {
//		media: [{ mediaId: mediaId }],
//		lastUpdatedUserEmailAddress: appState.ctx.userInfo.user.email
//	};

//	// adding loading spinner
//	$('i', activeDiv).removeClass().addClass('icon-spinner icon-spin');

//	dataServices.addMediaToSyndicationList( data, listGuid, function( err, data, meta ) {
//		if (meta.status === 200) {

//			appState.ctx.selectedList.selectedMediaIds.push(mediaId);

//			// remove spinner
//			$('i', activeDiv).removeClass().addClass('icon-remove');

//			onCompleteHandler();
//		}
//	});
//}

//var remove = exports.remove = function(activeDiv, listGuid, mediaId, onCompleteHandler) {

//	var data = {
//		media: [{ mediaId: mediaId }],
//		lastUpdatedUserEmailAddress: appState.ctx.userInfo.user.email
//	};

//	// adding loading spinner
//	$('i', activeDiv).removeClass().addClass('icon-spinner icon-spin');

//	dataServices.removeMediaToSyndicationList( data, listGuid, function( err, data, meta ) {
//		if (meta.status === 200) {

//			appState.ctx.selectedList.selectedMediaIds = _.without(appState.ctx.selectedList.selectedMediaIds, mediaId);

//			// remove spinner
//			$('i', activeDiv).removeClass().addClass('icon-plus');

//			onCompleteHandler();
//		}
//	});
//};

//exports.setupSelectionOptions = function(mediaId, activeDiv, postAdd, postRemove) {

//	var selected;

//	// is user logged in to see add/remove options?
//	if (appState.ctx.selectedList) {
//		if ( _.contains( appState.ctx.selectedList.selectedMediaIds, mediaId ) ) {
//			selected = true;
//			postAdd();
//		} else {
//			selected = false;
//		}

//		activeDiv
//			.prop( 'selected', selected )
//			.on( 'click', function() {
//				var selected, func, funcParam;

//				// remove item from user's cart
//				if ($(this).prop('selected')) {
//					func = remove;
//					funcParam = postRemove;
//					selected = false;
//				// add item to user's cart
//				} else {
//					func = add;
//					funcParam = postAdd;
//					selected = true;
//				}

//				func(activeDiv, appState.ctx.selectedList.id, mediaId, funcParam);
//				$(this).prop('selected', selected);
//			});
//	}
//};