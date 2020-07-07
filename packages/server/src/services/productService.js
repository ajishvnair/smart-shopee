const { Product } = require('../models/product.model');

// service for get all  data
exports.list = async function () {
  try {
    const  product = await Product.find({});
    return  product;
  } catch (e) {
    throw Error('Error while getting all data  ');
  }
};

// service for get data using id
exports.show = async function (id) {
  try {
    const  product = await Product.findById(id);
    return  product;
  } catch (e) {
    throw Error('Error while finding data with ID ');
  }
};

// service for post data
exports.create = async function ( product) {
  try {
    const dat = await new Product( product);
    await dat.save();
    return dat;
  } catch (error) {
    throw Error('Error while Posting data ');
  }
};

// service for update data using id
exports.update = async function (id,  product) {
  try {
    const dat = await Product.findByIdAndUpdate(id, product, { new: true });
    return dat;
  } catch (error) {
    throw Error('Error while updating data ');
  }
};

// service for delete data using id
exports.delete = async function (id) {
  try {
    await Product.findByIdAndRemove(id);
  } catch (error) {
    throw Error('Error while deleting data');
  }
};
