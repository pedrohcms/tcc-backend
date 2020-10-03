import { celebrate, Joi, Segments } from "celebrate";

export const sessionValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);
