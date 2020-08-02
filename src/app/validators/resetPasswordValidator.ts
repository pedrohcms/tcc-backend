import { celebrate, Segments, Joi } from "celebrate";

export const resetPasswordShowBodyValidator = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    }),
  },
  {
    abortEarly: false,
  }
);

export const resetPasswordStoreBodyValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
  }
);
