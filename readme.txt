
Embeddable Storefront Project Setup
------------------------


For Windows:

install node.js from  http://www.nodejs.org/download/

run the node.js command prompt

	- Start -> Node.js -> Node.js command prompt

install module 'grunt-cli' globally

	- in node command prompt: npm install -g grunt-cli


** Add any new references to BOTH .csjproj file and build.xml (for Jenkins)


HOW TO BUILD:
-------------

cd to same directory as Gruntfile.js (root folder of project)

	--- MANUALLY ---

	if you want to switch and test different environments

		in node command prompt: 
			grunt build --target=<TARGET> --embeddable=true
		
		possible target arguments: debug, dev, test, prototype, prod (e.g. grunt build --target=dev)


	--- AUTOMATICALLY ---

	watches javascript, less and [index.]html files for changes and builds files automatically on the fly
	--> IMPORTANT: assumes 'local' (development) environment!

		in node command prompt:

			grunt watch --embeddable=true



HOW TO SETUP ISSEXPRESS FROM THE COMMAND LINE:
----------------------------------------------

on Windows 7:
	- go to C:\Program Files\IIS Express
	- iisexpress /site:<name>
		e.g. iisexpress /site:Storefront

additional help:
http://www.iis.net/learn/extensions/using-iis-express/running-iis-express-from-the-command-line
http://stackoverflow.com/questions/8735713/creating-virtual-directories-in-iis-express






<------  TEMPORARY PLACEHOLDERS  ------>

IISExpress
http://www.iis.net/learn/extensions/using-iis-express/running-iis-express-from-the-command-line
http://www.codeproject.com/Articles/396569/Make-Web-Development-Easier-with-IIS-Express



aditional information:

node.js
http://www.nodejs.org/
http://www.nodejs.org/documentation/
http://www.nodejs.org/documentation/api/

grunt:
http://gruntjs.com/

watchify:
https://github.com/substack/watchify

browserify:
http://browserify.org/
https://github.com/substack/node-browserify
https://github.com/jmreidy/grunt-browserify









Angular HTML 5 mode:

Front end settings:
https://scotch.io/quick-tips/pretty-urls-in-angularjs-removing-the-hashtag

Server settings:
https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode