const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string
    data.username = !isEmpty(data.username) ? data.username : "";
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.middlename = !isEmpty(data.middlename) ? data.middlename : "";
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

     // Username checks

     if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
      }

    // First Name checks
        if (Validator.isEmpty(data.firstname)) {
            errors.firstname = "Name field is required";
        }

    // Last Name checks
        if (Validator.isEmpty(data.lastname)) {
            errors.lastname = "Name field is required";
        }

    // Email checks 
        if (Validator.isEmpty(data.email)) {
            errors.email = "Email field is required";
        } else if (!Validator.isEmail(data.email)) {
            errors.email = "Email is invalid";
        }

    // Phone Number checks

        if (Validator.isEmpty(data.phoneNumber)) {
            errors.phoneNumber = "Phone Number field is required";
        } else if (!Validator.isMobilePhone(data.phoneNumber)) {
            errors.phoneNumber = "Phone Number is invalid";
        }

    // Address Checks

        if (Validator.isEmpty(data.address)) {
            errors.address = "Address field is required";
        } 

    // Password checks
        if (Validator.isEmpty(data.password)) {
            errors.password = "Password field is required";
        } 

        if (Validator.isEmpty(data.password2)) {
            errors.password = "Confirm password field is required";
        } 

        if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!Validator.equals(data.password, data.password2)) {
            errors.password2 = "Passwords must match";
        }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};