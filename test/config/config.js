/**
 This is the default configuration for running all tests.

 You can override any of these directives by placing a local.js file in the config folder. Do not add your local.js to version control.
 */

var CEAUser = require('../util/CEAUser');

var defaultConfig = {
    seleniumAddress: 'http://qa-seleniumhub.clickfox.net:4444/wd/hub',
    specs: ['../topLevelSuite.js'],
    multiCapabilities: [{
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }, {
        browserName: 'internet explorer',
        version: '8'
    }, {
        browserName: 'internet explorer',
        version: '9'
    }, {
        browserName: 'internet explorer',
        version: '10'
    }, {
        browserName: 'internet explorer',
        version: '11'
    }],

    baseURL: 'http://example.com',
    params: {
        // Arbitrary test config goes here

        // Default users
        // TODO: get the real email addresses for these users
        // TODO: uncomment these when the UI actually has a backend
//        adminUser: new CEAUser('root', 'password', 'super', 'user', 'nobody@clickfox.com'),
//        nonAdminUser: new CEAUser('loginTestNonAdmin', 'goodPassword5%', 'loginTestNonAdmin', 'loginTestNonAdminLastName', 'nobody@clickfox.com')

        // I am the night
        adminUser: new CEAUser('test', 'test', 'Bruce', 'Wayne', 'bruce@wayneenterprises.com'),
        nonAdminUser: new CEAUser('test', 'test', 'Bruce', 'Wayne', 'bruce@wayneenterprises.com')
    }
};

// override defaultConfig with local config, if such a thing exists
try  {
    var local = require('./local.js');

    for (var key in local.config) {
        defaultConfig[key] = local.config[key];
    }
}
catch (e) {
    // If there is no local config, ain't no thing.
}



exports.config = defaultConfig;