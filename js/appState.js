'use strict';

var _ = require( 'lodash' ),
	dataServices = require( './dataServices' );

var _ctx = exports.ctx = {
	topicId: '',
	topicName: '',

	mediaType: '',
	mediaTypeDisplayName: '',
	searchText: '',
	searchMediaType: '',
	selectedMediaId: '',
	pagerParam: '1',
	sortDirection: 'desc',
	groupFlag: false,
	userInfo: null,
	dataParams: null,

	selectedList: {
		id: '',
		name: '',
		selectedMediaIds: []
	}
};

exports.setTopic = function(topicId, topicName) {
	_ctx.pagerParam = '1';
	_ctx.searchText = '';
	_ctx.searchMediaType = '';
	_ctx.selectedMediaId = '';

	_ctx.topicId = topicId;
	_ctx.topicName = topicName;
};

exports.setSearchText = function(searchText) {
	_ctx.pagerParam = '1';
	_ctx.searchText = searchText;
};

exports.setSearchMediaType = function(searchMediaType, displayName) {
	_ctx.pagerParam = '1';
	_ctx.selectedMediaId = '';
	_ctx.mediaType = searchMediaType;
	_ctx.searchMediaType = searchMediaType;
	_ctx.mediaTypeDisplayName = displayName || '';
};

exports.setUserInfo = function(userInfo, onComplete) {

	_ctx.userInfo = userInfo;

	if (userInfo && userInfo.syndicationLists.length) {
		var selectedList = userInfo.syndicationLists[0];
		return setSelectedList(selectedList.listName, selectedList.syndicationListId, onComplete);
	}

	return onComplete && onComplete();
};

var setSelectedList = exports.setSelectedList = function(name, id, onComplete) {

	_ctx.selectedList.id = id;
	_ctx.selectedList.name = name;

	dataServices.getSyndicationIds( id, function (err, ids) {
		_ctx.selectedList.selectedMediaIds = ids;
		return onComplete && onComplete(ids);
	});
};

exports.clearUserInfo = function() {
	_ctx.userInfo = null;
	_ctx.selectedList = { name: '', id: '', selectedMediaIds: [] };
	$.cookie("userData", "", { path: '/' });
};

var clearSearchParams = exports.clearSearchParams = function() {
	_ctx.mediaType = '';
	_ctx.mediaTypeDisplayName = '';
	_ctx.topicId = '';
	_ctx.topicName = '';

	_ctx.searchText = '';
	_ctx.searchMediaType = '';
	_ctx.selectedMediaId = '';

	_ctx.pagerParam = '1';
};

var isEmpty = exports.isEmpty = function() {
	return !_ctx.selectedMediaId && !_ctx.topicId && !_ctx.mediaType && !_ctx.mediaTypeDisplayName &&
			!_ctx.searchText && (!_ctx.pagerParam || _ctx.pagerParam === '1');
};

exports.loadFromHash = function( context ) {

	clearSearchParams();

	if (context) {
		// deep copy properties
		_.merge( _ctx, context );
		_ctx.searchMediaType = _ctx.mediaType || _ctx.searchMediaType;
	}
};

exports.addCurrentStateToHistory = function() {

	var context = {};

	if (!isEmpty()) {
		// deep copy properties
		_.merge( context, _ctx );
	}

	// temp: display some parameters in the url
	var urlParam = [];
	if ( context.topicId ) urlParam.push( 'topicid=' + context.topicId );
	if ( context.selectedMediaId ) urlParam.push( 'mediaid=' + context.selectedMediaId );

	history.pushState( context, 'Public Health Media Library', '#/context?' + urlParam.join( '&' ) );
};

exports.variables = {};