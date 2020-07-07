const Joi = require("@hapi/Joi");

const productValidation = (data) => {
  const schema = Joi.object({
    categoryId: Joi.string().required(),
    productNameEnglish: Joi.string().required(),
    productNameMalayalam: Joi.string().required(),
    image: Joi.string().required(),
    actualPrice: Joi.number().required(),
    discountPrice: Joi.number().required(),
    status: Joi.boolean().required(),
    isDeleted: Joi.boolean().required(),
    description: Joi.string().optional(),
    availability: Joi.array().required().items({
      startTime: Joi.string().optional(),
      endTime: Joi.string().optional(),
    }),
  });
  return schema.validate(data);
};
const updateValidation = (data) => {
  const schema = Joi.object({
    categoryId: Joi.string().optional(),
    productNameEnglish: Joi.string().optional(),
    productNameMalayalam: Joi.string().optional(),
    image: Joi.string().optional(),
    actualPrice: Joi.number().optional(),
    discountPrice: Joi.number().optional(),
    status: Joi.string().optional(),
    isDeleted: Joi.string().optional(),
    availability: Joi.array().optional().items({
      startTime: Joi.string().optional(),
      endTime: Joi.string().optional(),
    }),
    description: Joi.string().optional(),
  });
  return schema.validate(data);
};
module.exports.productValidation = productValidation;
module.exports.updateValidation = updateValidation;
