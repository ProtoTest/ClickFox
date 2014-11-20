/**
 * Created by rballantyne on 11/5/14.
 *
 * This file runs every test suite. (At least, all of them that have been added to the subsuites array.)
 */

// Add new suites to this array. Use require syntax.
subsuites = [
    './general/login/login'
];

// Allow people to override the default set of suites for convenience in debugging
if (typeof browser.params.overrideSuites === "object") {
    subsuites = browser.params.overrideSuites;
}

browser.driver.manage().window().maximize();
subsuites.forEach(function(subsuite) {
    browser.get('/');

    require(subsuite)();
});