const { Image } = require('../models/image.model');
const { Product } = require('../models/product.model');

// service for get all  data
exports.list = async function () {
  try {
    const images = await Image.find({});
    return images;
    s;
  } catch (e) {
    throw Error('Error while getting all data  ');
  }
};
// service for get data using id
exports.show = async function (id) {
  try {
    const images = await Image.findById(id);

    return images;
  } catch (e) {
    throw Error('Error while finding data with ID ');
  }
};
// service for post data
exports.create = async function (image) {
  try {
    const dat = await new Image(image);
    await dat.save();
    return dat;
  } catch (error) {
    throw Error('Error while Posting data ');
  }
};
// service for update data using id
exports.update = async function (id, image) {
  try {
    const dat = await Image.findByIdAndUpdate(id, image, { new: true });
    return dat;
  } catch (error) {
    throw Error('Error while updating data ');
  }
};
// service for delete data using id
exports.delete = async function (id) {
  try {
    await Image.findByIdAndRemove(id);
  } catch (error) {
    throw Error('Error while deleting data');
  }
};
//service for add  image
exports.productImage = async function (id, image) {
  try {
    // create new child
    const newimage = await new Image(image);
    const newproduct = await Product.findById(id);
    // assign a owner for an image
    newimage.product = newproduct;
    await newimage.save();
    const a = newproduct.images.length;
    if (a == 0) newproduct.images = newimage;
    if (a > 0) newproduct.images.push(newimage);
    await newproduct.save();
    return newimage;
  } catch (error) {
    throw Error('Error while creating image data');
  }
};
