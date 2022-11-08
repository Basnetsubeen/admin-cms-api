import express from "express";
import { newCategoryValidation } from "../middlewares/joi-validation/joiValidation.js";
import {
  getAllCategories,
  getCategoryById,
  insertCategory,
} from "../models/category/CategoryModel.js";
import slugify from "slugify";

const router = express.Router();

//get categories
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const categories = _id
      ? await getCategoryById(_id)
      : await getAllCategories();

    res.json({
      status: "success",
      message: "Categories list",
      categories,
    });
  } catch (error) {
    next(error);
  }
});

//insert category
//we need to use slugify to add somethings inside parent category otherwise it shows duplicate error
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      trim: true,
    });
    const result = await insertCategory(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New Category has been added",
        })
      : res.json({
          status: "error",
          messsage: "Unable to add the category, please try agian later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
