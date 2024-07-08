const  express = require('express');
const usersRenderController = require('../controllers/usersRenderController.js')
const { isAuthenticated, isNotAuthenticated } = require ('../middleware/auth.js');

const router = express.Router();

router.get('/login', isNotAuthenticated, usersRenderController.renderLogin);

router.get('/register', isNotAuthenticated, usersRenderController.renderRegister);

router.get('/profile', isAuthenticated, usersRenderController.renderProfile);

router.get('/user', usersRenderController.renderUser);

module.exports = router;
