module.exports = function ( ) {

	return {

		TEMP__ORIGIN__USAGE_GUIDELINES: null,
		
		getUserData: function () {
			if (window.sessionStorage.userData) {
				return $.parseJSON(window.sessionStorage.userData);
			}
			else {
				return undefined;
			}
		},

		setUserData : function (value) {
			window.sessionStorage.userData = JSON.stringify(value);
		},

		deleteUserData : function () {
			window.sessionStorage.removeItem('userData');			
		},
		//{{syndicationList.userService.getDefaultSyndicationList().listName}}
		getDefaultSyndicationList: function () {
			if (!window.sessionStorage.userData) { return undefined; }
			
			var userData = $.parseJSON(window.sessionStorage.userData);
			var syndLists = userData.syndicationLists;

			if(syndLists.length===0){ // if 0 then bad account
				return undefined;
			} else if (syndLists.length === 1) { // if 1 then return it.
				return syndLists[0];
			} else {
				// look for list flagged as default
				var defaultList = $.grep(syndLists, function (l) {return l.isDefault; })[0];
				if (defaultList) {
					return defaultList;
				} else { //return first found
					return syndLists[0];
				}
			}
		},
		getSyndicationListById: function (guid) {
			if (!window.sessionStorage.userData) { return undefined; }

			var userData = $.parseJSON(window.sessionStorage.userData);
			var syndLists = userData.syndicationLists;

			var defaultList = $.grep(syndLists, function (l) { return l.syndicationListId === guid; })[0];
			if (defaultList) {
				return defaultList;
			} else { //return first found
				return undefined;
			}
		}
	};

};