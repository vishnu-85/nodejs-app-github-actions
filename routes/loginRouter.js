const express = require('express');
const router = express.Router();

const { db } = require('../mongodb/db-config');
const swaggerJSDoc = require('swagger-jsdoc');

const { loginController, verifyController, logoutController } =  require('../controller/loginController')
const { userController } = require('../controller/userController')
const {authUser}  = require('../middleware/auth')


router.post('/login', loginController)
router.get('/verify', verifyController)
router.get('/logout', [authUser], logoutController)


module.exports = router;