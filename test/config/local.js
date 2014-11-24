var HtmlReporter = require('protractor-html-screenshot-reporter');

exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumAddress: null,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
        	args: ['incognito', 'disable-extensions', 'start-maximized', 'enable-crash-reporter-for-testing']
	    },

	    loggingPrefs: {
	        browser: 'ALL'
	    }
    },
    multiCapabilities: [],

    baseUrl: 'http://chupaqueso.clickfox.net:3333', //'http://localhost:3333',

    // Page load timeout and verifying angular is on the page (in milliseconds)
    getPageTimeout: 30000, // 30 seconds

    // Asynchronous script execution timeout (in milliseconds) - time to wait (default 11 seconds)
    // allScriptsTimeout: 11000 // 11 seconds

	framework: 'jasmine',

    // To change for one individual spec, pass a third parameter to it: it(description, testFn, timeout_in_millis).
    //jasmineNodeOpts: 300000, // 5 minutes
    jasmineNodeOpts: {
	    // If true, display spec names.
	    isVerbose: true,
	    // If true, print colors to the terminal.
	    showColors: true,
	    // If true, include stack traces in failures.
	    includeStackTrace: true,
	    // Default time to wait in ms before a test fails.
	    defaultTimeoutInterval: 300000 // 5 minutes
  	},

  	onPrepare: function() {
        // The require statement must be down here, since jasmine-reporters@1.0
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter('xml_output', true, true));

        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'html_report',
            takeScreenShotsOnlyForFailedSpecs: true,
            metaDataBuilder: function metaDataBuilder(spec, descriptions, results, capabilities) {
              // Return the description of the spec and if it has passed or not:
              return {
                 description: descriptions.join(' '),
                 passed: results.passed(),
                 os: capabilities.caps_.platform,
                browser: {
                    name: capabilities.caps_.browserName,
                    version: capabilities.caps_.version
                },
                Awesome : 'YES I AM??' // FORK THE REPO AND ADD A LOG FILE PATH
              };
          }
        }));
    }
};