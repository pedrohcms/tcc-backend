import { celebrate, Joi, Segments } from "celebrate";

export const engineOperationValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      farmId: Joi.number().required(),
      startDateTime: Joi.date().required(),
      endDateTime: Joi.date().required()
    }),
  },
  {
    allowUnknown: true,
  }
);
