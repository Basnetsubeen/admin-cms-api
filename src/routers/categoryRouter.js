import express from "express";
import {
  newCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  hasChildCategoryById,
  insertCategory,
  updateCategoryById,
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
//update category
router.put("/", updateCategoryValidation, async (req, res, next) => {
  try {
    const hasChildCategory = await hasChildCategoryById(req.body._id);
    if (hasChildCategory) {
      return res.json({
        status: "error",
        message:
          "This categories has a child categories, please delete or re assign them to another category before taking this action",
      });
    }

    const categoryUpdate = await updateCategoryById(req.body);
    categoryUpdate?._id
      ? res.json({
          status: "success",
          message: "Category has been updated",
        })
      : res.json({
          status: "error",
          messsage: "Unable to update the category, please try agian later",
        });
  } catch (error) {
    next(error);
  }
});

//delete category
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const hasChildCategory = await hasChildCategoryById(_id);
    if (hasChildCategory) {
      return res.json({
        status: "error",
        message:
          "This categories has a child categories, please delete or re assign them to another category before taking this action",
      });
    }

    const deleteCategory = await deleteCategoryById(_id);
    deleteCategory?._id
      ? res.json({
          status: "success",
          message: "The category has been updated",
        })
      : res.json({
          status: "error",
          messsage: "Unable to delete the category, please try agian later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
