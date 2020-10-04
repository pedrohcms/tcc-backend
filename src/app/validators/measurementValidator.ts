import { celebrate, Joi, Segments } from "celebrate";
import { CustomHelpers } from "@hapi/joi";
import { queryTypeEnum } from "../utils/getFarmMeasures";

const queryTypeValidator = (value: string, helpers: CustomHelpers) => {
  if (
    (value != null || value != undefined) &&
    value != queryTypeEnum.GROUP &&
    value != queryTypeEnum.LIST &&
    value != queryTypeEnum.SUM
  )
    return helpers.error('"query_type" value must be GROUP, LIST or SUM');

  return value;
};

const orderByValidator = (value: string, helpers: CustomHelpers) => {
  if (
    (value != null || value != undefined) &&
    value != "asc" &&
    value != "desc"
  ) {
    return helpers.error("'orderBy' value must be asc or desc");
  }

  return value;
};

export const measurementsIndexValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    farm_id: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    orderBy: Joi.string()
      .custom(orderByValidator, "Validator for orderBy")
      .error(new Error("'orderBy' value must be asc or desc")),
    queryType: Joi.string()
      .custom(queryTypeValidator, "Validator for queryType")
      .error(new Error('"query_type" value must be GROUP, LIST or SUM')),
  }),
});

export const measurementsStoreValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    farm_id: Joi.number().required(),
    water_amount: Joi.number().required(),
    created_at: Joi.date(),
  }),
});
