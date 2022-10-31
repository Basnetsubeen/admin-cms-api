import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(helmet());
app.use(express.json()); //for parser

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
