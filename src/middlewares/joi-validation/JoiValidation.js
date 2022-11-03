import Joi from "joi";
import {
  ADDRESS,
  FNAME,
  LNAME,
  EMAIL,
  PASSWORD,
  SHORTSTR,
  validator,
  STATUS,
  LONGSTR,
  NUMBER,
  DATE,
  PHONE,
} from "./constant.js";

export const newAdminUserValidation = (req, res, next) => {
  //define rules
  const schmea = Joi.object({
    fName: FNAME.required(),
    lName: LNAME.required(),
    email: EMAIL.required(),
    password: PASSWORD.required(),
    phone: PHONE,
    address: ADDRESS,
    dob: DATE.allow("", null),
  });
  //give data to the rules
  validator(schmea, req, res, next);
};
//for validating the user
export const emailVerificationValidation = (req, res, next) => {
  //define rules
  const schmea = Joi.object({
    email: EMAIL.required(),
    emailVerificationCode: SHORTSTR.required(),
  });
  //give data to the rules
  validator(schmea, req, res, next);
};
