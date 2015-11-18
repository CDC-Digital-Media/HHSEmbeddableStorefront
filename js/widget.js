'use strict';
(function(window, document, undefined) {

	/*
		TemplatePackage Widget Common Functionality - 03/2015 - G. Ewing

		** Description / Purpose ***********************************************************************************************

		This file is intended to be called locally by any CDC widget, it will load common widget functionality for
		all widgets.

		The intent is common scripts can be shared in to:
		1. Re Use Core Code / Increase Managability / Decrease Maintenance Time / Redundancy
		2. Reduce completity of individual widget libraries
		3. Reduce Complexity / DeMystify Metrics Calling

		***************************************************************************************************************************
	*/

	window.CDC = window.CDC || {};
	window.CDC.Widget = window.CDC.Widget || {};
	window.CDC.Widget.load = function () {

		// ADD POINTER/SHORTCUT FOR COMMON
		window.cdcCommon = window.CDC.Widget.Common;

		// ADD POINTER/SHORTCUT FOR METRICS
		window.cdcMetrics = window.cdcCommon.metrics;


		// SET YOUR EMBED CODE HERE (INT PRE FORMAT [&gt;] instead of [>] etc.)
		window.cdcCommon.events.setEmbedCode('&lt;div data-cdc-widget="EmbeddableStorefront"&gt;&lt;/div&gt;\n&lt;script src="http://www......[domain]...../TemplatePackage/contrib/widgets/tp-widget-external-loader.js"&gt;&lt;/script&gt;');

		// INIT METRICS
		window.cdcMetrics.init({
			c32 : "EmbeddableStorefront",
			pageName : "Embeddable Storefront",
			useMetrics : 'false'
		});

		//window.cdcCommon.runtime.callParams

		/*
			BASIC USAGE EXAMPLES :

			// SCRIPT CALL WITH CUSTOM PARAM OVERRIDES
			cdcMetrics.trackData({
				c17 : "Your Syndication Override",
				c33 : "Your-Custom-Event"
			});

			// SCRIPT CALL WITH BASIC CUSTOM EVENT TRACKING
			cdcMetrics.trackEvent("Your-Custom-Event");

			// HTML INLINE SCRIPT CALL (NOT SUGGESTED AS BEST PRACTICE - EVENT BINDING PREFERRED)
			<a href="#" onclick="cdcMetrics.trackEvent('Your-Custom-Event')">Your Link</a>
		*/

    var widgetParams = window.cdcCommon.runtime.callParams;
    var wid = widgetParams.wid;

    if (wid && wid !== '') {

      // INIT METRICS
      window.cdcMetrics.init({
        c32 : "EmbeddableStorefront",
        pageName : "Embeddable Storefront",
        useMetrics : 'false'
      });

      var newUrl = '#/embeddable/collectionId/';
      newUrl = newUrl + widgetParams.collectionid + '/';
      var widgetTitle = widgetParams.title;
      if (widgetTitle && widgetTitle !== '') {
          newUrl = newUrl + 'title/' + encodeURI(widgetTitle) + '/';
      }
      var widgetTheme = widgetParams.theme;
      if (widgetTheme && widgetTheme !== '') {
          newUrl = newUrl + 'theme/' + widgetTheme + '/';
      }
      var widgetControls = widgetParams.controls;
      if (widgetControls && widgetControls !== '') {
          newUrl = newUrl + 'controls/' + widgetControls + '/';
      }
      window.cdcCommon.log("New Url: " + newUrl);
      window.location.hash = newUrl;
    }

	};

	window.CDC.Widget.syndicatedLoad = function (cdcCommon) {

		cdcCommon = cdcCommon || window.cdcCommon || window.CDC.Widget.Common;

	};

} (window, document));
