import AdminUserSchema from "./AdminUserSchema.js";

//insert new admin user
export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};

//update user both are object expect find by id
//filter will check the combination of user in our database
export const updateOneAdminUser = (filter, update) => {
  return AdminUserSchema.findOneAndUpdate(filter, update, { new: true });
};
