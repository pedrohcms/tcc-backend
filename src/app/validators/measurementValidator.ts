import { celebrate, Joi, Segments } from "celebrate";

export const measurementsIndexValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    farm_id: Joi.number().required(),
  }),
});

export const measurementsStoreValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    farm_id: Joi.number().required(),
    water_amount: Joi.number().required(),
    created_at: Joi.date(),
  }),
});
