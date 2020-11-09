import { celebrate, Segments, Joi } from "celebrate";

export const linkUserFarmIndexValidator = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      farm_id: Joi.number().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);

export const linkUserFarmStoreValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      address: Joi.string().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);

export const linkUserFarmDestroyValidator = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      email: Joi.string().required(),
      address: Joi.string().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);
