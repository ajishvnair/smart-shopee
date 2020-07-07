const express = require('express');
const router = express.Router();
const multer = require('multer');

const productController = require('../../controllers/product.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

// get all data
router.get('/', productController.list);
// get data using id
router.get('/:id', productController.show);
// post data
router.post('/', upload.single('image'), productController.create);
// update data using id
router.put('/:id', productController.update);
// delete data using id
router.delete('/:id', productController.delete);

module.exports = router;
