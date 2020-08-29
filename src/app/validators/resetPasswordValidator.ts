import { celebrate, Segments, Joi } from "celebrate";

export const resetPasswordValidator = celebrate(
  {
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required(),
      confirm_password: Joi.string().required(),
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
