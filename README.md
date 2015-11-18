
#HHS Embeddable Storefront
This is a prototype application to allow

##PROJECT SETUP
For Windows:
install node.js from  http://www.nodejs.org/download/

run the node.js command prompt
- Start -> Node.js -> Node.js command prompt

install module 'grunt-cli' globally
- in node command prompt: 
```npm install -g grunt-cli```

Add any new references to BOTH .csjproj file and build.xml (for Jenkins)

##HOW TO BUILD:

cd to same directory as Gruntfile.js (root folder of project)

###MANUALLY
if you want to switch and test different environments

in node command prompt: 
```grunt build --target=<TARGET> --embeddable=true```
    
possible target arguments: debug, dev, test, prototype, prod (e.g. grunt build --target=dev)

###AUTOMATICALLY

watches javascript, less and [index.]html files for changes and builds files automatically on the fly

--> IMPORTANT: assumes 'local' (development) environment!

in node command prompt:
```grunt watch --embeddable=true```



##HOW TO SETUP ISSEXPRESS FROM THE COMMAND LINE:

on Windows 7:
* go to C:\Program Files\IIS Express
* iisexpress /site:<name>

e.g. iisexpress /site:Storefront

additional help:
http://www.iis.net/learn/extensions/using-iis-express/running-iis-express-from-the-command-line
http://stackoverflow.com/questions/8735713/creating-virtual-directories-in-iis-express

##USE:
The storefront is embedded with the CDC widget framework.  To add the storefront to a page you must include a div with data
attributes for storefront configuration, and a script.  The data attributes include:

* data-collectionId - this is the ID of the collection of content to appear in the storefront.  For the HHS prototype this is 5, which is actually the NIH source ID.
* data-theme - (optional) This sets the color scheme of the storefront.  Possible values include:
  * blue (default)
  * green
  * rose
  * teal
  * orange
  * purple
  * tan
* data-title - (optional) The title displays at the top of the embeddable storefront.  If this attribute is left off the title will be set to ‘Public Health Media Library’
* data-controls - (optional) This is a Boolean parameter that controls the display of the pagination and ordering controls in the embeddable storefront.  The default is ‘true’.  ‘false’ will disable the controls, which is useful in cases where the collection may not be large enough to require pagination or ordering options.

Code for embed example:

```
<div data-cdc-widget="EmbeddableStorefrontHHS" data-collectionId="5" data-theme="green" data-title="NIH Content Storefront"></div>
<script type="text/javascript" src="//www.cdc.gov/TemplatePackage/contrib/widgets/tp-widget-external-loader.js"></script>
```

You can also view index.html and pass in the configuration options with # fragments at the end of the url like:

```index.html#/embeddable/collectionId/5/title/Test%20Embeddable%20Storefront/theme/blue/controls/false```



##OTHER INFO
###IISExpress
http://www.iis.net/learn/extensions/using-iis-express/running-iis-express-from-the-command-line
http://www.codeproject.com/Articles/396569/Make-Web-Development-Easier-with-IIS-Express

###node.js
http://www.nodejs.org/
http://www.nodejs.org/documentation/
http://www.nodejs.org/documentation/api/

###grunt:
http://gruntjs.com/

###watchify:
https://github.com/substack/watchify

###browserify:
http://browserify.org/
https://github.com/substack/node-browserify
https://github.com/jmreidy/grunt-browserify

###Angular HTML 5 mode:

###Front end settings:
https://scotch.io/quick-tips/pretty-urls-in-angularjs-removing-the-hashtag

###Server settings:
https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode