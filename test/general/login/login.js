/**
 * Created by rballantyne on 11/6/14.
 *
 * Suite of tests for the login screen.
 */

var loc = require('../generalLocators');
var po = require('../generalActions');
var CEAUser = require('../../util/CEAUser');

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
