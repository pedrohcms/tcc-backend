import { celebrate, Joi, Segments } from "celebrate";

export const profileIndexValidator = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);

export const profileUpdateValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      userId: Joi.number().required(),
      profileId: Joi.number().required()
    }),
  },
  {
    allowUnknown: true,
  }
);