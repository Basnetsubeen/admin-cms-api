import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminUserValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  findOneAdminUser,
  insertAdminUser,
  updateOneAdminUser,
} from "../models/adminUser/AdminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  userVerificationNotification,
  verificationEmail,
} from "../helpers/emailHelpers.js";
import { createJWTs } from "../helpers/jwtHelper.js";

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
          }) && userVerificationNotification(user)
        : res.json({
            status: "error",
            message: "Invalid or expired link, no action was taken",
          });
    } catch (error) {
      next(error);
    }
  }
);

//log in admin user
router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //find the if the user exist based on given email
    const user = await findOneAdminUser({ email });

    if (user?._id) {
      if (user?.status !== "active")
        return res.json({
          status: "error",
          message: "Your account has not been verified, Please check you email",
        });
    }
    //we need to verify if the password send by the user and hasdpassword store is same or not
    const isMatched = comparePassword(password, user.password);

    if (isMatched) {
      user.password = undefined;
      //jwt
      const jwts = await createJWTs({ email });
      return res.json({
        status: "success",
        message: "Login Successsfully",
        user,
        ...jwts,
      });
    }
    res.json({
      status: "error",
      message: "Invalid login credentials",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
