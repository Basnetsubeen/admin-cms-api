import express from "express";
import { insertAdminUser } from "../models/adminUser/AdminUserModel.js";

const router = express.Router();
//server side validation
//encrypt user password
//insert into the database
//create a unique verification code
//create a link pointing to our frontend with our email and verification code and send to their email.

//post new admin user
router.post("/", (req, res, next) => {
  try {
    console.log(req.body);
    const user = insertAdminUser();
    user?._id
      ? res.json({
          status: "success",
          message:
            "We have send you a link to verify your account, Please check your email including junk folder",
        })
      : res.json({
          status: "error",
          message: "Unable to create a admin user, please try again!!",
        });
  } catch (error) {
    next(error);
  }
});
//verify admin user email
router.patch("/", (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "The email has been verified",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
