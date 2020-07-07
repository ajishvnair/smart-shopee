const Joi = require('@hapi/joi');
const imageValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    image: Joi.any()
      .meta({ swaggerType: 'file' })
      .optional()
      .description('image file'),
    description: Joi.string().min(2).required(),
  });
  return schema.validate(data);
};
const imageValidationn = (datas) => {
  const schema = Joi.object({
    _id: Joi.string().optional(),
    __v: Joi.number().optional(),
    name: Joi.string().min(2).optional(),
    image: Joi.any()
      .meta({ swaggerType: 'file' })
      .optional()
      .description('image file'),
    description: Joi.string().min(2).optional(),
  });
  return schema.validate(datas);
};
module.exports.imageValidation = imageValidation;
module.exports.imageValidationn = imageValidationn;
