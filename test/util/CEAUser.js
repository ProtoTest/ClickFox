/**
 * Created by rballantyne on 11/6/14.
 *
 * Data storage object that holds information about a CEA user.
 */


module.exports = function(username, password, firstname, lastname, email) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
};