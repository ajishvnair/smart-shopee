const express = require('express');
const router = express.Router();

const categoryController = require('../../controllers/category.controller');

// get all data
router.get('/', categoryController.list);
// get data using id
router.get('/:id', categoryController.show);
// post data
router.post('/', categoryController.create);
// update data using id
router.put('/:id', categoryController.update);
// delete data using id
router.delete('/:id', categoryController.delete);

module.exports = router;