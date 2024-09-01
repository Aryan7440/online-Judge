const constants = require('./constants')

exports.validateEmail = (email) => {
  return constants.email_validation_regex.test(email)
}

exports.validatePassword = (password) => {
  return constants.password_validation_regex.test(password)
}
