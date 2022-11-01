import AdminUserSchema from "./AdminUserSchema.js";

//insert new admin user
export const insertAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};
