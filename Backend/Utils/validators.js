const constants = require('./constants.js')

exports.validateEmail = (email) => {
  if (!constants.email_validation_regex) {
    throw new Error('Email validation regex is not defined');
  }
  return constants.email_validation_regex.test(email)
}

exports.validatePassword = (password) => {
  return constants.password_validation_regex.test(password)
}
