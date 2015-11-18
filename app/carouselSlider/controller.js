var TEMPLATE_MAPPING = require( '../config/SETTINGS' ).TEMPLATE_MAPPING,
	SERVER = require( '../../js/CONFIG' ).SERVER;


function Controller ( carouselSliderService, temp_app ) {

	this.temp_app = temp_app;
	this.template = TEMPLATE_MAPPING.CAROUSEL_SLIDER;
	this.API_ROOT = SERVER.API_ROOT;

	carouselSliderService.get( SERVER.CAROUSEL_COLLECTION_ID ).then( ({ data }) => {
		this.items = data;
	});
}

//TEMP: COMPATIBILITY FUNCTIONALITY
Controller.prototype.loaded = function ( value ) {

	if ( value ) {		
		
		var root = SERVER.WEB_ROOT === "/" ? window.location.protocol +"//"+ window.location.host + "/" : window.location.protocol + "//" + window.location.host + SERVER.WEB_ROOT +"/";
		
		$.getScript(root + "js/libs/flexslider.js")
			.done(function (script, textStatus) {
				//console.log('loading local flexslider');
				applyFlexSlider();
			})
			.fail(function (jqxhr, settings, exception) {
				//console.log('failed to load local flexslider');
			});
	}
};

function applyFlexSlider(){

	// TEMP
	$( '#carousel1' ).flexslider({
		animation: 'slide',
		animationLoop: true,
		itemWidth: 224,
		itemMargin: 4,
		minItems: 1,
		move: 684,
		slideshowSpeed: 7000,
		prevText: '',
		nextText: '<span class="icon-angle-right"></span><span class="hidden">next</span>',
		controlNav: true,
		pauseOnHover: true,
		pauseOnFocus: true,
		thumbCaptions: true
	});

	// TEMP
	$( '#slider1' ).flexslider({
		animation: 'slide',
		directionNav: true,
		controlNav: true,
		thumbCaptions: true
	});

	// TEMP
	$( '.flex-direction-nav a.flex-prev' ).html( '<span class="icon-angle-left"></span><span class="hidden">previous</span>' );
	$( '.flex-direction-nav a.flex-next' ).html( '<span class="icon-angle-right"></span><span class="hidden">next</span>' );

	//console.log( 'carouselSlider loaded' );
}

module.exports = Controller;