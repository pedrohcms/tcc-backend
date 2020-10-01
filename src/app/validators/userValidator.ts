import { celebrate, Joi, Segments } from "celebrate";

export const userValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);
