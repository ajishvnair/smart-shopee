const express = require('express');
const router = express.Router();

const cartController = require('../../controllers/cart.controller');

// get all data
router.get('/', cartController.list);
// get data using id
router.get('/:id', cartController.show);
// post data
router.post('/', cartController.create);
// update data using id
router.put('/:id', cartController.update);
// delete data using id
router.delete('/:id', cartController.delete);

module.exports = router;
