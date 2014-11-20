/**
 * Created by rballantyne on 11/6/14.
 *
 * This file holds reusable general actions, such as logging in or out, that many tests need.
 */

var loc = require('./generalLocators');

/**
 * Log in to CEA.
 *
 * @param user A CEAUser object providing the desired credentials.
 * @param rememberMe A boolean stating the desired state of the remember username checkbox.
 */
exports.login = function(user, rememberMe) {
    exports.populateLoginFields(user, rememberMe);

    element(loc.loginButton).click();
};


/**
 * Populate the fields of the login page with the provided credentials.
 *
 * @param user A CEAUser object providing the desired credentials.
 * @param rememberMe A boolean stating the desired state of the remember username checkbox.
 */
exports.populateLoginFields = function(user, rememberMe) {
    var username = element(loc.loginUsername);
    username.clear();
    username.sendKeys(user.username);

    var password = element(loc.loginPassword);
    password.clear();
    password.sendKeys(user.password);

    exports.setCheckboxTo(loc.loginRememberUsername, rememberMe);
};


/**
 * Set a checkbox to be either selected or not, based on whether the desiredState parameter is true or false.
 *
 * @param locator A By object that locates the checkbox.
 * @param desiredState A boolean dictating the desired selected state of the checkbox.
 */
exports.setCheckboxTo = function(locator, desiredState) {
    var checkbox = element(locator);

    if (checkbox.isSelected() === desiredState)  {
        checkbox.click();
    }
};