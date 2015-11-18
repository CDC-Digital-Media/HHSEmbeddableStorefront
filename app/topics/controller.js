function Controller ( topicsService, $scope, $location, $routeParams, resultRouteBuilder ) {

	var self = this;
	this.$scope = $scope;
	this.$location = $location;
	this.$routeParams = $routeParams;
	this.topicsService = topicsService;
	this.resultRouteBuilder = resultRouteBuilder;
	this.selectedTopics = $.cookie('selectedTopics') ?  $.parseJSON($.cookie('selectedTopics')) : [];

	this.showSpinnerMain = true;
	this.showSpinnerSub = true;

	var _data;
	var _html;
	var valueSetData, typeAheadArray = [], mapped = {};

	topicsService.getTopicByMediaType('').then( function({data}){
		self.data = data;
		self.showSpinnerMain = false;

		var tpcs = [];

		$(data).each(function(idx, itm) {
			tpcs.push(itm.name); 
			mapped[itm.name] = itm.id;
			$(itm.items).each(function(itm_idx, itm_itm){
				tpcs.push(itm_itm.name);
				mapped[itm_itm.name] = itm_itm.id;
			});			
		});

		typeAheadArray = tpcs.filter( onlyUnique );

		$('.topicAutosuggest').typeahead({
			source: typeAheadArray,
			updater: function (term) {
				var id = mapped[term];
				self.browse(id);			
				$scope.$apply();
			}
		});

	});

	$scope.select= function(item) {
		$scope.selected = item; 
	};

	$scope.isActive = function(item) {
		return $scope.selected === item;
	};

}

function getSubTopics(id, self) {
	var $location = self.$location;
	
	self.topicsService.getTopicIndex(id).then( function({data}){
		self.subtopics = data[0].items;
		self.showSpinnerSub = false;
		
		if (data[0].items.length === 0) {
			self.browse(id);
		}
	});
}

Controller.prototype.browse = function(id){
	if (this.selectedTopics.indexOf(id) > -1) {
		this.selectedTopics.splice(this.selectedTypes.indexOf(id), 1);
	} else {
		this.selectedTopics.push(id);
	}

	$.cookie('selectedTopics', JSON.stringify(this.selectedTopics));

	this.$location.path(this.resultRouteBuilder.getRoute());
};

Controller.prototype.selectCategory = function (id, name, $event) {
	this.selectedCategory = true;
	this.selectedTitle = name;
	this.selectedId = id;
	this.showSpinnerSub = true;
	
	getSubTopics(id, this);
};

function onlyUnique(value, index, self) { 
	return self.indexOf(value) === index;
}

module.exports = Controller;