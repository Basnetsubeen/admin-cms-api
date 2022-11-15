import CategorySchema from "./CategorySchema.js";

//insert Category
export const insertCategory = (obj) => {
  return CategorySchema(obj).save();
};

//get categories
export const getAllCategories = () => {
  return CategorySchema.find();
};

//get a catergory
export const getCategoryById = (_id) => {
  return CategorySchema.findById(_id);
};
//update catergory
export const updateCategoryById = ({ _id, ...update }) => {
  return CategorySchema.findByIdAndUpdate(_id, update, { new: true });
};
//update catergory that has child
export const hasChildCategoryById = async (parentId) => {
  const hasChild = await CategorySchema.findOne({ parentId });
  return hasChild?._id ? true : false;
};

//delete catergory
export const deleteCategoryById = (_id) => {
  return CategorySchema.findByIdAndDelete(_id);
};
