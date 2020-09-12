import { celebrate, Joi, Segments } from "celebrate";

export const farmValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      address: Joi.string().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);
