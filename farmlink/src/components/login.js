/*
import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  render() {
    return (
      <div>
        Login
        <div>Insert Stuff here</div>
        <Link to="/">Homepage</Link>
      </div>
    );
  }
}

export default Login;

*/
const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks 
      if (Validator.isEmpty(data.email)) {
          errors.email = "Email field is required";
      } else if (!Validator.isEmail(data.email)) {
          errors.email = "Email is invalid";
      }
  // Password checks
      if (Validator.isEmpty(data.password)) {
          errors.password = "Password field is required";
      } 
  
  return {
      errors,
      isValid: isEmpty(errors)
  };
};