/**
 * Created by rballantyne on 11/6/14.
 *
 * Locators for parts of the app that are used by several test suites.
 */

module.exports = {
    loginUsername: by.id('username'),
    loginPassword: by.id('password'),
    loginRememberUsername: by.model('rememberUserName'),
    loginButton: by.buttonText('Log In'),

    // The following is a function because it needs the user parameter in order to find the right thing
    landingPageUserNameCSS: function(user) {
        return by.cssContainingText('div.cf-top-nav span.ng-binding', user.firstname +' '+ user.lastname);
    }
};