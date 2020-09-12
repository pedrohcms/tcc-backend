import { celebrate, Joi, Segments } from "celebrate";

export const farmStoreValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.number().required(),
      name: Joi.string().required(),
      address: Joi.string().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);

export const farmIndexValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    user_id: Joi.number().required(),
  }),
});
