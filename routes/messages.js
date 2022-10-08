/*
    Path: /api/messages
*/

const { Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getChat } = require('../controllers/messages');

const router = Router();

//To receive a request and validate JWT,
router.get('/:from', validateJWT, getChat);

module.exports = router;