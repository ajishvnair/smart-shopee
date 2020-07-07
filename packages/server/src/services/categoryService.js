const { Category } = require('../models/category.model');

// service for get all  data
exports.list = async function () {
  try {
    const category = await Category.find({});
    return category;
  } catch (e) {
    throw Error('Error while getting all data  ');
  }
};

// service for get data using id
exports.show = async function (id) {
  try {
    const category = await Category.findById(id);
    return category;
  } catch (e) {
    throw Error('Error while finding data with ID ');
  }
};

// service for post data
exports.create = async function (category) {
  try {
    const dat = await new Category(category);
    await dat.save();
    return dat;
  } catch (error) {
    throw Error('Error while Posting data ');
  }
};

// service for update data using id
exports.update = async function (id, category) {
  try {
    const dat = await Category.findByIdAndUpdate(id, category, { new: true });
    return dat;
  } catch (error) {
    throw Error('Error while updating data ');
  }
};

// service for delete data using id
exports.delete = async function (id) {
  try {
    await Category.findByIdAndRemove(id);
  } catch (error) {
    throw Error('Error while deleting data');
  }
};
