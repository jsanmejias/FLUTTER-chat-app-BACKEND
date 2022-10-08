/*
path: api/login
*/

const { Router} = require('express');
const { check } = require('express-validator');

const { createUser, login, renewJWT } = require('../controllers/auth');
const { validatefields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//To receive a request and create a new user
router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validatefields
], createUser);

//To receive a request and validate the login with email and password
router.post('/',
[
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validatefields
], login);

//To receive a request and validate JWT,
router.get('/renew', validateJWT, renewJWT);

module.exports = router;