const productService = require('../services/productService');
const { productValidation } = require('../validation/schema/product.schema');
const { updateValidation } = require('../validation/schema/product.schema');

exports.list = async function (req, res, next) {
  try {
    const product = await productService.list({}, (page = 10), (limit = 10));
    return res.status(200).json({ data: product });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// api for getting data using id

exports.show = async function (req, res, next) {
  const id = req.params.id;

  try {
    const product = await product.show(id);
    return res.status(200).json({ data: product });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// api for posting
exports.create = async function (req, res, next) {
  // Lets Validate the data before a user register
  const { product } = req.body;
  const img = req.file;
  product.image = `${process.env.HOST_NAME}/${img.path}`;
  try {
    const { error } = await productValidation(product);

    if (error) return res.status(422).send(error.details);
    dat = await productService.create(product);
    return res.status(200).json({ data: dat });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

// api for update
exports.update = async function (req, res, next) {
  try {
    const id = req.params.id;
    const { product } = req.body;
    const { error } = await updateValidation(product);

    if (error) return res.status(422).send(error.details);
    data = await productService.update(id, product);
    return res.status(200).json({ data: data });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// api for delete
exports.delete = async function (req, res, next) {
  const id = req.params.id;

  try {
    const data = await productService.delete(id);

    return res.status(204).json({ data: data });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
