const imageService = require('../services/imageService');

const { imageValidation } = require('../validation/schema/image.schema');
const { imageValidationn } = require('../validation/schema/image.schema');

exports.list = async function (req, res, next) {
  // api for getting all data
  try {
    const images = await imageService.list({}, (page = 10), (limit = 10));
    return res.status(200).json({ data: images });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// api for getting data using id

exports.show = async function (req, res, next) {
  const id = req.params.id;

  try {
    const image = await imageService.show(id);
    return res.status(200).json({ data: image });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// api for posting
exports.create = async function (req, res, next) {
  // Lets Validate the data before a user register
  const img = req.file;
  const image = req.body;
  image.image = `${process.env.HOST_NAME}/${img.path}`;
  try {
    // lets validate the data before a user register
    const { error } = await imageValidation(image);
    if (error) return res.status(422).send(error.details);
    const dat = await imageService.create(image);
    return res.status(200).json({ data: dat });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
// api for update
exports.update = async function (req, res, next) {
  try {
    const id = req.params.id;
    const img = req.file;
    const image = req.body;
    image.image = img.path;
    const { error } = await imageValidationn(id, image);
    if (error) return res.status(422).send(error.details);
    dat = await imageService.update(id, image);
    return res.status(200).json({ data: dat });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
// api for delete
exports.delete = async function (req, res, next) {
  const id = req.params.id;

  try {
    await imageService.delete(id);

    return res.status(204).json();
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.productImage = async function (req, res, next) {
  // Lets Validate the data before a user register
  const host = req.headers.host;
  const { id } = req.params;
  const img = req.file;
  const image = req.body;
  // image.image = req.protocol + '://' + host + '/' + img.path;
  image.image = `${process.env.HOST_NAME}/${img.path}`;
  try {
    // lets validate the data before a user register
    const { error } = await imageValidation(image);
    if (error) return res.status(422).send(error.details);
    const dat = await imageService.productImage(id, image);
    return res.status(200).json({ data: dat });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
