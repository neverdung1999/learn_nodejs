import Joi from 'joi';
import { format } from './format-error';
import { IErrorDetail } from '../response-messages/index';
import { baseValidateSchemas } from './base-validate-schemas';

function validate(
  data,
  schema,
  validateOption
){
    if (schema) {
        const { error } = schema.validate(data, validateOption);
        if (error) {
          const e = format(error);
          return e;
        } else {
          return null;
        }
      } else {
        return null;
      }
}
export { validate, baseValidateSchemas };
