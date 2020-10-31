import { celebrate, Joi, Segments } from "celebrate";
import { CustomHelpers } from "@hapi/joi";

const queryTypeValidator = (value: string, helpers: CustomHelpers) => {
  if (
    (value != null || value != undefined) &&
    value != queryTypeEnum.LIST &&
    value != queryTypeEnum.SUM
  )
    return helpers.error('"query_type" value must be LIST or SUM');

  return value;
};

export const measurementsIndexValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    farmId: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    queryType: Joi.string().required()
      .custom(queryTypeValidator, "Validator for queryType")
      .error(new Error('"query_type" value must be LIST or SUM')),
  }),
});

export const measurementsStoreValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    farmCultureId: Joi.number().required(),
    waterAmount: Joi.number().required(),
    moisture: Joi.number().required(),
    createdAt: Joi.date(),
  }),
});

enum queryTypeEnum {
  SUM = "SUM",
  LIST = "LIST"
}