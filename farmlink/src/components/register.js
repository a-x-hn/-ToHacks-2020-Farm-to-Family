const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.middlename = !isEmpty(data.middlename) ? data.middlename : "";
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // First Name checks
        if (Validator.isEmpty(data.firstname)) {
            errors.name = "Name field is required";
        }

    // Last Name checks
        if (Validator.isEmpty(data.lastname)) {
        errors.name = "Name field is required";
        }

    // Email checks 

    // Password checks


}