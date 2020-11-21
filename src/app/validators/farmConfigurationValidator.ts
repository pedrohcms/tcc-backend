import { celebrate, Joi, Segments } from "celebrate";
import { CustomHelpers } from "@hapi/joi";

const engineTypeValidator = (value: string, helpers: CustomHelpers) => {
  if (
    (value != null || value != undefined) &&
    value != 'eletrico' &&
    value != 'combustivel'
  )
    return helpers.error('"engineType" value must be eletrico or combustivel');

  return value;
};

export const farmConfigurationValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      engineType: Joi.string().required().custom(engineTypeValidator, "Validator for engineType").error(new Error('"engineType" value must be eletrico or combustivel')),
      unityAmount: Joi.number().required(),
      unityPrice: Joi.number().required(),
    }),
  },
  {
    allowUnknown: true,
  }
);