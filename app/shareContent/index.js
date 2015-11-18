var Controller = require('./controller');
var service = require('./service');

module.exports = function (module) {
	module
		.factory('shareContentService', ['dataService', service])
		.controller('ShareContentController', ['shareContentService', 'userService', '$rootScope', '$location', '$routeParams', 'temp_app', Controller]);
};