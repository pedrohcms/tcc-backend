import { celebrate, Joi, Segments } from "celebrate";

export const farmCultureValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      farmId: Joi.number().required(),
      sector: Joi.string().required(),
      cultureId: Joi.number().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);
