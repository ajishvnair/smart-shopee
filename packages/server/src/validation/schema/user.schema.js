const Joi = require('@hapi/Joi');
const userValidation = data => {
  const schema = Joi.object({
    fname: Joi.string()
    .min(4)
    .required(),
    lname: Joi.string()
    .min(4)
    .required(),
    username: Joi.string()
      .min(4)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(4)
      .required(),
    role: Joi.string()
      .valid('admin','teacher','student')
      .min(2)
      .required(),
    newemail: Joi.string()
      .email()
      .optional(),
    newpassword: Joi.string()
      .min(4)
      .optional(),

  });
  return schema.validate(data);
};
const updateValidation = data => {
    const schema = Joi.object({
      fname: Joi.string()
      .min(4)
      .optional(),
      lname: Joi.string()
      .min(4)
      .optional(),
      username: Joi.string()
        .min(4)
        .optional(),
      email: Joi.string()
        .email()
        .optional(),
      password: Joi.string()
        .min(4)
        .optional(),
      role: Joi.string()
        .valid('admin','teacher','student')
        .min(2)
        .optional(),
      newemail: Joi.string()
        .email()
        .optional(),
      newpassword: Joi.string()
        .min(4)
        .optional(),
  
    });
    return schema.validate(data);
  };
module.exports.userValidation = userValidation;
module.exports.updateValidation = updateValidation;
