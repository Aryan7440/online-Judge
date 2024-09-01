const express = require('express')
const signupController = require('../controllers/auth_controllers/sign_up')
const loginController = require('../controllers/auth_controllers/login')
const logoutController = require('../controllers/auth_controllers/logout')
const deleteUserController = require('../controllers/auth_controllers/delete_user')
const cookieParser = require('cookie-parser')

const router = express.Router()
router.use(cookieParser())
router.post('/signup', signupController.signUp)
router.post('/login', loginController.login)
router.get('/logout', logoutController.logout)
router.delete('/deleteUser', deleteUserController.deleteUser)

module.exports = router
