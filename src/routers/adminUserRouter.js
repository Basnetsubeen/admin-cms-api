import express from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  newAdminUserValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  insertAdminUser,
  updateOneAdminUser,
} from "../models/adminUser/AdminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { verificationEmail } from "../helpers/emailHelpers.js";

const router = express.Router();
//server side validation
//encrypt user password
//insert into the database
//create a unique verification code
//create a link pointing to our frontend with our email and verification code and send to their email.

//post new admin user
router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.emailVerificationCode = uuidv4();

    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message:
          "We have send you a link to verify your account, Please check your email including junk folder",
      });
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailVerificationCode}&e=${user.email}`;

      //send email
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }
    //http://localhost:3000/admin/verify-email?c=23423dfgd&e=subin@12.com

    res.json({
      status: "error",
      message: "Unable to create a admin user, please try again!!",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already another user with this email, Please try another email!";
    }
    next(error);
  }
});
//verify admin user email
router.patch(
  "/verify-email",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      const { email, emailVerificationCode } = req.body;

      const user = await updateOneAdminUser(
        {
          email,
          emailVerificationCode,
        },
        {
          status: "active",
          emailVerificationCode: "",
        }
      );
      console.log(user);
      user?._id
        ? res.json({
            status: "success",
            message: "The email has been verified, you may login now",
          })
        : res.json({
            status: "error",
            message: "Invalid or expired link, no action was taken",
          });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
