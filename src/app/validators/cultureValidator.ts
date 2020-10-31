import { celebrate, Joi, Segments } from "celebrate";

export const cultureValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      idealMoisture: Joi.number().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);
