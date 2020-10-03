import { celebrate, Joi, Segments } from "celebrate";

export const farmStoreValidator = celebrate(
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
