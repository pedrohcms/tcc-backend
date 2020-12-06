import { celebrate, Joi, Segments } from "celebrate";

export const engineOperationStoreValidator = celebrate(
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

export const engineOperationShowValidator = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      farmId: Joi.number().required(),
      startDateTime: Joi.date().required(),
      endDateTime: Joi.date().required()
    }),
  },
  {
    allowUnknown: true,
  }
);