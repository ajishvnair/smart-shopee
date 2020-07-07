const { Cart } = require('../models/cart.model');

// service for get all  data
exports.list = async function () {
  try {
    const cart = await Cart.find({});
    return cart;
  } catch (e) {
    throw Error('Error while getting all data  ');
  }
};

// service for get data using id
exports.show = async function (id) {
  try {
    const cart = await Cart.findById(id);
    return cart;
  } catch (e) {
    throw Error('Error while finding data with ID ');
  }
};

// service for post data
exports.create = async function (cart) {
  try {
    const dat = await new Cart(cart);
    await dat.save();
    return dat;
  } catch (error) {
    throw Error('Error while Posting data ');
  }
};

// service for update data using id
exports.update = async function (id, cart) {
  try {
    const dat = await Cart.findByIdAndUpdate(id, cart, { new: true });
    return dat;
  } catch (error) {
    throw Error('Error while updating data ');
  }
};

// service for delete data using id
exports.delete = async function (id) {
  try {
    await Cart.findByIdAndRemove(id);
  } catch (error) {
    throw Error('Error while deleting data');
  }
};
