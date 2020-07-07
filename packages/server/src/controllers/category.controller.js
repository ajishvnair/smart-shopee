const categoryService = require('../services/categoryService');
const { categoryValidation } = require('../validation/schema/category.schema');
const { updateValidation } = require('../validation/schema/category.schema');

exports.list = async function (req, res, next) {
  try {
    const category = await categoryService.list({}, (page = 10), (limit = 10));
    return res.status(200).json({ data: category });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// api for getting data using id

exports.show = async function (req, res, next) {
  const id = req.params.id;

  try {
    const category = await categoryService.show(id);
    return res.status(200).json({ data: category });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// api for posting
exports.create = async function (req, res, next) {
  // Lets Validate the data before a user register
  const { category } = req.body;

  try {
    const { error } = await categoryValidation(category);

    if (error) return res.status(422).send(error.details);
    dat = await categoryService.create(category);
    return res.status(200).json({ data: dat });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

// api for update
exports.update = async function (req, res, next) {
  try {
    const id = req.params.id;
    const { category } = req.body;
    const { error } = await updateValidation(category);

    if (error) return res.status(422).send(error.details);
    data = await categoryService.update(id, category);
    return res.status(200).json({ data: data });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// api for delete
exports.delete = async function (req, res, next) {
  const id = req.params.id;

  try {
    const data = await categoryService.delete(id);

    return res.status(204).json({ data: data });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
