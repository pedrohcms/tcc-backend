const { celebrate, Joi, Segments } = require("celebrate");

module.exports = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
  }
);
