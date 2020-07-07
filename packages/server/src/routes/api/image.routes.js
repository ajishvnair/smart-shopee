const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const multer = require('multer');

const imageController = require('../../controllers/image.controller');
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
router.get('/', imageController.list);
// get data using id
router.get('/:id', imageController.show);
// post data
router.post('/', upload.single('image'), imageController.create);
// Add  image
router.post(
  '/product/:id',
  upload.single('image'),
  imageController.productImage
);
// update data using id
router.put('/:id', upload.single('image'), imageController.update);
// delete data using id
router.delete('/:id', imageController.delete);

module.exports = router;
