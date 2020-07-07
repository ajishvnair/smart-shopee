const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userController = require('../../controllers/user.controller');
// register new user
router.post('/register', userController.register);
// create token and login
router.post('/login', userController.login);
// get all data
router.get('/', userController.list);
// get data using id
router.get('/:id', userController.show);
// delete data using id
router.delete('/:id', userController.delete);
// update data using id
router.put('/', userController.update);

module.exports = router;
