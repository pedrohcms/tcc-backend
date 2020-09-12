import { celebrate, Joi, Segments } from "celebrate";

export const userValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      admin_id: Joi.number().required(),
      name: Joi.string().required(),
      email: Joi.string().required().email(),
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
