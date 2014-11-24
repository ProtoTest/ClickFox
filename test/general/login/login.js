/**
 * Created by rballantyne on 11/6/14.
 *
 * Suite of tests for the login screen.
 */

var loc = require('../generalLocators');
var po = require('../generalActions');
var CEAUser = require('../../util/CEAUser');


var fs = require('fs'),
    path = require('path');

// Add global spec helpers in this file
var getDateStr = function () {
    var d = (new Date() + '').replace(new RegExp(':', 'g'), '-').split(' ');
    // "2013-Sep-03-21:58:03"
    return [d[3], d[1], d[2], d[4]].join('-');
};

var errorCallback = function (err) {
    console.log(err);
};

// create a new javascript Date object based on the timestamp
var timestampToDate = function (unix_timestamp) {
    var date = new Date(unix_timestamp);
    // hours part from the timestamp
    var hours = date.getHours();
    // minutes part from the timestamp
    var minutes = date.getMinutes();
    // seconds part from the timestamp
    var seconds = date.getSeconds();

    var timeValues = [hours, minutes, seconds];
    timeValues.forEach(function (val) {
        if (val.length < 2) {
            // padding
            val = '0' + val;
        }
    });
    // will display time in 10:30:23 format
    return hours + ':' + minutes + ':' + seconds;
};

// Take a screenshot automatically after each failing test.
afterEach(function () {
    var passed = jasmine.getEnv().currentSpec.results().passed();
    // Replace all space characters in spec name with dashes
    var specName = jasmine.getEnv().currentSpec.description.replace(new RegExp(' ', 'g'), '-'),
        baseFileName = specName + '-' + getDateStr(),
        reportDir = path.resolve(__dirname + '/../report/'),
        consoleLogsDir = path.resolve(reportDir + '/logs/'),
        screenshotsDir = path.resolve(reportDir + '/screenshots/');

    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir);
    }

    if (!passed) {
        // Create screenshots dir if doesn't exist
        console.log('screenshotsDir = [' + screenshotsDir + ']');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }

        var pngFileName = path.resolve(screenshotsDir + '/' + baseFileName + '.png');
        browser.takeScreenshot().then(function (png) {
            // Do something with the png...
            console.log('Writing file ' + pngFileName);
            fs.writeFileSync(pngFileName, png, {encoding: 'base64'}, function (err) {
                console.log(err);
            });
        }, errorCallback);
    }

    // Flush browser console to file
    var logs = browser.driver.manage().logs(),
        logType = 'browser'; // browser
    logs.getAvailableLogTypes().then(function (logTypes) {
        if (logTypes.indexOf(logType) > -1) {
            var logFileName = path.resolve(consoleLogsDir + '/' + baseFileName + '.txt');
            browser.driver.manage().logs().get(logType).then(function (logsEntries) {
                if (!fs.existsSync(consoleLogsDir)) {
                    fs.mkdirSync(consoleLogsDir);
                }
                // Write the browser logs to file
                console.log('Writing file ' + logFileName);
                var len = logsEntries.length;
                for (var i = 0; i < len; ++i) {

                    var logEntry = logsEntries[i];

                    var msg = timestampToDate(logEntry.timestamp) + ' ' + logEntry.type + ' ' + logEntry.message;
                    fs.appendFileSync(logFileName, msg + '\r\n', {encoding: 'utf8'}, errorCallback);
                }
            }, errorCallback);
        }
    });

});


module.exports = function() {

    describe('The Login Screen', function() {

        it('should have the right controls', function() {
            expect(element(loc.loginUsername).isPresent()).toBe(true);
            expect(element(loc.loginPassword).isPresent()).toBe(true);
            expect(element(loc.loginRememberUsername).isPresent()).toBe(true);
            expect(element(loc.loginButton).isPresent()).toBe(true);
        });


        // The login button will be needed for the next few cases
        var loginButton = element(loc.loginButton);

        it('should disable the login button when the form is empty', function() {
            po.populateLoginFields(new CEAUser('', '', '', '', ''), false);
            expect(loginButton.isEnabled()).toBe(false);
        });

        it('should enable the login button when the form is populated', function() {
            po.populateLoginFields(browser.params.adminUser, false);
            expect(loginButton.isEnabled()).toBe(true);
        });

        it('should disable the login button when the password field is cleared', function() {
            po.populateLoginFields(browser.params.adminUser, false);
            element(loc.loginPassword).clear();

            expect(loginButton.isEnabled()).toBe(false);
        });

        it('should disable the login button when the username field is cleared', function() {
            po.populateLoginFields(browser.params.adminUser, false);
            element(loc.loginUsername).clear();

            expect(loginButton.isEnabled()).toBe(false);
        });


        it('should log in a valid admin user', function() {
            po.login(browser.params.adminUser, false);

            expect(element(loc.landingPageUserNameCSS(browser.params.adminUser)).isPresent()).toBe(true);
        });
    });
};
