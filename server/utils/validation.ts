import { Course, type Examinee } from "~/types/types";
import Joi from "joi";

export const examineeValidation = {
  insert: (data: Examinee) => {
    const schema = Joi.object({
      first_name: Joi.string().min(3).required().messages({
        "string.base": `First Name should be a type of 'text'`,
        "string.empty": `First Name cannot be empty`,
        "string.min": `First Name should have a minimum length of {#limit}`,
        "string.required": `First Name cannot be null or empty`,
      }),
      last_name: Joi.string().min(3).required().messages({
        "string.base": `Last Name should be a type of 'text'`,
        "string.empty": `Last Name cannot be empty`,
        "string.min": `Last Name should have a minimum length of {#limit}`,
        "string.required": `Last Name cannot be null or empty`,
      }),
      middle_name: Joi.string().min(3).required().messages({
        "any.required": `Middle Name cannot be null or empty`,
      }),
      username: Joi.string().min(3).required().messages({
        "any.required": `Username cannot be null or empty`,
      }),
      password: Joi.string().min(3).empty().required().messages({
        "any.required": `Password cannot be null or empty`,
      }),
    });
    return schema.validate(data);
  },

  update: (data: Examinee) => {
    const schema = Joi.object({
      examinee_id: Joi.number().optional(),
      first_name: Joi.string().min(3).empty().optional(),
      last_name: Joi.string().min(3).empty().optional(),
      middle_name: Joi.string().min(3).empty().optional(),
      username: Joi.string().min(3).empty().optional(),
      password: Joi.string().min(3).empty().optional(),
    });
    return schema.validate(data);
  },
};

export const courseValidation = {
  insert: (data: Course) => {
    const schema = Joi.object({
      description: Joi.string().required().messages({
        "string.empty": `Course cannot be empty`,
        "any.required": `Course cannot be null or empty`,
      }),
      score: Joi.number().min(1).required().messages({
        "string.base": `Score should be a type of 'number'`,
        "string.empty": `Score cannot be empty`,
        "any.required": `Score cannot be null or empty`,
      }),
    });
    return schema.validate(data);
  },
  update: (data: Course) => {
    const schema = Joi.object({
      course_id: Joi.number().optional(),
      description: Joi.string().empty().optional().messages({
        "string.empty": `Description cannot be empty`,
      }),
      score: Joi.number().empty().optional().messages({
        "string.base": `Score should be a type of 'number'`,
        "string.empty": `Score cannot be empty`,
      }),
    });
    return schema.validate(data);
  },
};
