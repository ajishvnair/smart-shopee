const cartService = require('../services/cartService');
const { cartValidation } = require('../validation/schema/cart.schema');
const { updateValidation } = require('../validation/schema/cart.schema');

exports.list = async function (req, res, next) {
  try {
    const cart = await cartService.list({}, (page = 10), (limit = 10));
    return res.status(200).json({ data: cart });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// api for getting data using id

exports.show = async function (req, res, next) {
  const id = req.params.id;

  try {
    const cart = await cartService.show(id);
    return res.status(200).json({ data: cart });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// api for posting
exports.create = async function (req, res, next) {
  // Lets Validate the data before a user register
  const { cart } = req.body;

  try {
    const { error } = await cartValidation(cart);

    if (error) return res.status(422).send(error.details);
    dat = await cartService.create(cart);
    return res.status(200).json({ data: dat });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

// api for update
exports.update = async function (req, res, next) {
  try {
    const id = req.params.id;
    const { cart } = req.body;
    const { error } = await updateValidation(cart);

    if (error) return res.status(422).send(error.details);
    data = await cartService.update(id, cart);
    return res.status(200).json({ data: data });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// api for delete
exports.delete = async function (req, res, next) {
  const id = req.params.id;

  try {
    const data = await cartService.delete(id);

    return res.status(204).json({ data: data });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
