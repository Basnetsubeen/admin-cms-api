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
//for validating the user to login
export const loginValidation = (req, res, next) => {
  //define rulles
  const schmea = Joi.object({
    email: EMAIL.required(),
    password: SHORTSTR.required(),
  });
  //give data to the rules
  validator(schmea, req, res, next);
};

// =======categories =======
export const newCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schmea = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
  });
  validator(schmea, req, res, next);
};
export const updateCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schmea = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null, ""),
    _id: SHORTSTR.required(),
  });
  validator(schmea, req, res, next);
};
