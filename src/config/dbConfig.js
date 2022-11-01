import mongoose from "mongoose";

export const dbConnection = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log(
        "There is no connection string avaiable from process.env.MONGO_CLIENT"
      );
    }
    const conn = mongoose.connect(conStr);
    conn && console.log("Mongodb Connected");
  } catch (error) {
    console.log(error);
  }
};
