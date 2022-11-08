import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

const PORT = process.env.PORT || 8000;

//db Connection
import { dbConnection } from "./src/config/dbConfig.js";
dbConnection();

//middlewares
app.use(cors());
app.use(helmet());
app.use(express.json()); //for parser

//apis
import adminUserRouter from "./src/routers/adminUserRouter.js";
app.use("/api/v1/admin-user", adminUserRouter);
import categoryRouter from "./src/routers/categoryRouter.js";
app.use("/api/v1/category", categoryRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Hi you are lost",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.log(error);

  const statusCode = error.status || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

//Server
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at http://localhost:${PORT}`);
});
