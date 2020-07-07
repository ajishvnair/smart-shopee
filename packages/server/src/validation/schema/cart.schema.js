const Joi = require('@hapi/Joi');

const cartValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    product: Joi.array().required().items({
      productId: Joi.string().optional(),
      quantity: Joi.number().optional(),
      totalAmount: Joi.number().optional(),
    }),
  });
  return schema.validate(data);
};
const updateValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().optional(),
    product: Joi.array().optional().items({
      productId: Joi.string().optional(),
      quantity: Joi.number().optional(),
      totalAmount: Joi.number().optional(),
    }),
  });
  return schema.validate(data);
};
module.exports.cartValidation = cartValidation;
module.exports.updateValidation = updateValidation;
