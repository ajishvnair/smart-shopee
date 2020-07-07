const Joi = require("@hapi/Joi");

const categoryValidation = (data) => {
  const schema = Joi.object({
    categoryNameEnglish: Joi.string().required(),
    categoryNameMalayalam: Joi.string().required(),
    image: Joi.string().required(),
    status: Joi.boolean().required(),
    isDeleted: Joi.boolean().required(),
  });
  return schema.validate(data);
};
const updateValidation = (data) => {
  const schema = Joi.object({
    categoryNameEnglish: Joi.string().optional(),
    categoryNameMalayalam: Joi.string().optional(),
    image: Joi.string.optional(),
    status: Joi.string().optional(),
    isDeleted: Joi.string().optional(),
  });
  return schema.validate(data);
};
module.exports.categoryValidation = categoryValidation;
module.exports.updateValidation = updateValidation;
