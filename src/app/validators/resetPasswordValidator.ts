import { celebrate, Segments, Joi } from "celebrate";

export const resetPasswordValidator = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    }),
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
    allowUnknown: true,
    errors: {
      wrap: {
        array: false,
        label: false,
      },
    },
  }
);
