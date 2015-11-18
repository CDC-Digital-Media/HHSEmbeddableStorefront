var SETTINGS = require('../config/SETTINGS');

function Controller(shareContentService, userService, $rootScope, $location, $routeParams, temp_app) {

	var self = this;

	self.url = $routeParams.contentUrl;
	self.shareContentService = shareContentService;
	self.temp_app = temp_app;
	self.template = SETTINGS.TEMPLATE_MAPPING.SHARE_CONTENT;
	self.loggedIn = userService.getUserData() ? true: false;


	self.shareContentService.getData($routeParams.url).then( function({ data, meta }){
		self.data = data;
		self.meta = meta;

		self.encUrl =  encodeURI($routeParams.url);

		if(self.meta.pagination.total===0){
			// send to request a page
			$location.path( "/requestsyndication/url/" + self.encUrl );
		}
		else{		
			if(self.meta.pagination.total > 1){
				$rootScope.requestPageUrl = $routeParams.url;
			}
			else{
				$rootScope.requestPageMediaId = self.data[0].id;
			}
			if(self.loggedIn){
				self.route = self.meta.pagination.count > 1 ? "/results/url/" + self.encUrl : "/syndicationlist" ;
				$location.path(self.route);
			}else{				
				$location.path( "/login");
			}

		}

	});


	var i = 1;

}

module.exports = Controller;